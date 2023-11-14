import { useMutation, useQueryClient } from "@tanstack/react-query";
import FoodLog from "../entities/FoodLog";
import APIClient from "../services/api-cilent";
import createAxiosConfig from "../services/axios-config";
import useTokenStore from "./useTokenStore";

const apiClient = new APIClient<FoodLog>("/foodlog");

export const useAddFoodLog = () => {
    const {accessToken} = useTokenStore();
    const axiosConfig = createAxiosConfig(accessToken);

    const queryClient = useQueryClient(); // Get the query client instance
    return useMutation({
        mutationKey: ['foodlog'],
        mutationFn: (foodLog : FoodLog) => apiClient.post(foodLog,axiosConfig),
        onMutate: async (newFood) => {
            
            await queryClient.cancelQueries({ queryKey: ['foodlog'] })

            // Snapshot the previous value
            const previousFoodLog = queryClient.getQueryData<FoodLog[]>(['foodlog']) || [];
            
            if (previousFoodLog) {
                // Ensure previousFood is not undefined before working with it
                // Optimistically update the 'Food' data
                queryClient.setQueryData<FoodLog[]>(['foodlog'], (previousFoodLog) => [
                  ...(previousFoodLog || []),
                  newFood,
                ]);
            }
            return { previousFoodLog }
          },
          // If the mutation fails,
          // use the context returned from onMutate to roll back
          onError: (err, newFood, context) => {
            queryClient.setQueryData(['foodlog'], context?.previousFoodLog)
          },
          // Always refetch after error or success:
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['foodlog'] })
          },
        })
}
