import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FoodLog from "../entities/FoodLog";
import useAuthAPIClient from "./useAuthAPIClient";
import ms from "ms";

let endpoint = "/foodlog"

export const useFoodLogs = (mealType: string) => {
    const apiClient = useAuthAPIClient<FoodLog>(endpoint);
  
    return useQuery<FoodLog[], Error, FoodLog[]>({
      queryKey: ['foodlog', mealType], // Use an array to include the mealType in the queryKey
      queryFn: () => apiClient.getAll({ params: { mealType } }), 
      staleTime: ms('24h'),
      retry: 3, 
    });
  };


export const useAddFoodLog = (mealType: string) => {
    const apiClient = useAuthAPIClient<FoodLog>(endpoint);
    const queryClient = useQueryClient(); // Get the query client instance
    return useMutation({
        mutationKey: ['foodlog',mealType],
        mutationFn: (foodLog : FoodLog) => apiClient.post(foodLog),
        onMutate: async (newFood) => {
            
            await queryClient.cancelQueries({ queryKey: ['foodlog',mealType] })

            // Snapshot the previous value
            const previousFoodLog = queryClient.getQueryData<FoodLog[]>(['foodlog',mealType]) || [];
            
            if (previousFoodLog) {
                // Ensure previousFood is not undefined before working with it
                // Optimistically update the 'Food' data
                queryClient.setQueryData<FoodLog[]>(['foodlog',mealType], (previousFoodLog) => [
                  ...(previousFoodLog || []),
                  newFood,
                ]);
            }
            return { previousFoodLog }
          },
          // If the mutation fails,
          // use the context returned from onMutate to roll back
          onError: (err, newFood, context) => {
            queryClient.setQueryData(['foodlog',mealType], context?.previousFoodLog)
          },
          // Always refetch after error or success:
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['foodlog'] })
          },
        })
}
