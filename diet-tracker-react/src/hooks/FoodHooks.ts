import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Food from "../entities/Food";
import APIClient from "../services/api-cilent";
import ms from "ms";
import createAxiosConfig from "../services/axios-config";

const apiClient = new APIClient<Food>("/foods");

const axiosConfig = createAxiosConfig(null);

export const useFoods = () => useQuery<Food[]>({
    queryKey: ['foods'],
    queryFn: apiClient.getAll,
    staleTime: ms('24h'),
    retry: 10,
})

export const useDeleteFoods = () => {
    const queryClient = useQueryClient(); // Get the query client instance
    return useMutation({
        mutationKey: ['foods'],
        mutationFn: (foodId : number) => apiClient.delete(foodId,axiosConfig),
        onMutate: async (foodId) => {
            
            await queryClient.cancelQueries({ queryKey: ['foods'] })

            // Snapshot the previous value
            const previousFood = queryClient.getQueryData<Food>(['foods'])
        
              // Optimistically update the 'todos' data
            queryClient.setQueryData(['foods'], (previousFood?: Food[]) => {
                // Ensure you return the filtered data
                return previousFood?.filter((food) => food.id !== foodId);
            });
            
            // Return a context object with the snapshotted value
            return { previousFood }
          },
          // If the mutation fails,
          // use the context returned from onMutate to roll back
          onError: (err, newFood, context) => {
            queryClient.setQueryData(['foods'], context?.previousFood)
          },
          // Always refetch after error or success:
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['foods'] })
          },
        })
}
export const useAddFoods = () => {
    const queryClient = useQueryClient(); // Get the query client instance
    return useMutation({
        mutationKey: ['foods'],
        mutationFn: (food : Food) => apiClient.post(food,axiosConfig),
        onMutate: async (newFood) => {
            
            await queryClient.cancelQueries({ queryKey: ['foods'] })

            // Snapshot the previous value
            const previousFood = queryClient.getQueryData<Food[]>(['foods']) || [];
            
            if (previousFood) {
                // Ensure previousFood is not undefined before working with it
                // Optimistically update the 'foods' data
                queryClient.setQueryData<Food[]>(['foods'], (previousFood) => [
                  ...(previousFood || []),
                  newFood,
                ]);
            }
            return { previousFood }
          },
          // If the mutation fails,
          // use the context returned from onMutate to roll back
          onError: (err, newFood, context) => {
            queryClient.setQueryData(['foods'], context?.previousFood)
          },
          // Always refetch after error or success:
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['foods'] })
          },
        })
}
