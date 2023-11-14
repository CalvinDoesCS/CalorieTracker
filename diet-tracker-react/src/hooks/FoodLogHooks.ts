import { useMutation, useQueryClient } from "@tanstack/react-query";
import FoodLog from "../entities/FoodLog";
import useAuthAPIClient from "./useAuthAPIClient";



// export const useFoodLog = () => { 
//     const {accessToken} = useTokenStore();
//     apiClient.setAccessToken(accessToken);
    
//     return 
// })}


export const useAddFoodLog = () => {
    const apiClient = useAuthAPIClient("/foodlog");
    const queryClient = useQueryClient(); // Get the query client instance
    return useMutation({
        mutationKey: ['foodlog'],
        mutationFn: (foodLog : FoodLog) => apiClient.post(foodLog),
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
