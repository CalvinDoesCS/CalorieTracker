import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import Food from "../entities/Food";
import useAuthAPIClient from "./useAuthAPIClient";

let endpoint = "/foods";

export const useFoods = () => {
  const apiClient = useAuthAPIClient<Food>(endpoint);
  return useQuery<Food[]>({
    queryKey: ["foods"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    retry: 10,
  });
};

export const useDeleteFoods = () => {
  const apiClient = useAuthAPIClient<Food>(endpoint);
  const queryClient = useQueryClient(); // Get the query client instance
  return useMutation({
    mutationKey: ["foods"],
    mutationFn: (foodId: number) => apiClient.delete(foodId),
    onMutate: async (foodId) => {
      await queryClient.cancelQueries({ queryKey: ["foods"] });

      // Snapshot the previous value
      const previousFoods = queryClient.getQueryData<Food[]>(["foods"]);

      // Optimistically update the 'foods' data
      queryClient.setQueryData(
        ["foods"],
        (previousFoods: Food[] | undefined) => {
          // Ensure you return the filtered data
          return previousFoods?.filter((food) => food.id !== foodId);
        }
      );

      // Return a context object with the snapshotted value
      return { previousFoods };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newFood, context) => {
      queryClient.setQueryData(["foods"], context?.previousFoods);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};
export const useAddFoods = () => {
  const apiClient = useAuthAPIClient<Food>(endpoint);
  const queryClient = useQueryClient(); // Get the query client instance
  return useMutation({
    mutationKey: ["foods"],
    mutationFn: (food: Food) => apiClient.post(food),
    onMutate: async (newFood) => {
      await queryClient.cancelQueries({ queryKey: ["foods"] });

      // Snapshot the previous value
      const previousFoods = queryClient.getQueryData<Food[]>(["foods"]) || [];

      if (previousFoods) {
        // Ensure previousFood is not undefined before working with it
        // Optimistically update the 'Food' data
        queryClient.setQueryData<Food[]>(["foods"], (previousFoods) => [
          ...(previousFoods || []),
          newFood,
        ]);
      }
      return { previousFoods };
    },
    onSuccess: (res: Food) => {
      return res;
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newFood, context) => {
      queryClient.setQueryData(["foods"], context?.previousFoods);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};
export const useEditFoods = () => {
  const apiClient = useAuthAPIClient<Food>(endpoint);
  const queryClient = useQueryClient(); // Get the query client instance
  return useMutation({
    mutationKey: ["foods"],
    mutationFn: (food: Food) => apiClient.put(food.id, food),
    onMutate: async (newFood: Food) => {
      await queryClient.cancelQueries({ queryKey: ["foods"] });

      // Snapshot the previous value
      const previousFoods = queryClient.getQueryData<Food[]>(["foods"]);

      queryClient.setQueryData(
        ["foods"],
        (previousFoods: Food[] | undefined) => {
          return previousFoods?.map((food) => {
            if (food.id === newFood.id) {
              return newFood; // Replace the item with the updated data
            }
            return food; // Keep other items unchanged
          });
        }
      );

      // Return a context object with the snapshotted value
      return { previousFoods };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newFood, context) => {
      queryClient.setQueryData(["foods"], context?.previousFoods);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};
