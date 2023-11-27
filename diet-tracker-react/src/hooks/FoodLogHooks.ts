import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FoodLog from "../entities/FoodLog";
import ms from "ms";
import APIClient from "../services/api-cilent";

const apiClient = new APIClient<FoodLog>("/foodlogs");
export const useFoodLogs = (mealType: string, logDate: string) => {
  return useQuery<FoodLog[], Error, FoodLog[]>({
    queryKey: ["foodlog", mealType, logDate], // Use an array to include the mealType in the queryKey
    queryFn: () =>
      apiClient.getAll({
        params: logDate ? { mealType, logDate } : { mealType },
      }),
    staleTime: ms("10m"),
    retry: 3,
  });
};

export const useAddFoodLog = (mealType: string, logDate: string) => {
  const queryClient = useQueryClient(); // Get the query client instance
  return useMutation({
    mutationKey: ["foodlog", mealType, logDate],
    mutationFn: (foodLog: FoodLog) => apiClient.post(foodLog),
    onMutate: async (newFood) => {
      await queryClient.cancelQueries({
        queryKey: ["foodlog", mealType, logDate],
      });

      // Snapshot the previous value
      const previousFoodLog =
        queryClient.getQueryData<FoodLog[]>(["foodlog", mealType, logDate]) ||
        [];

      if (previousFoodLog) {
        // Ensure previousFood is not undefined before working with it
        // Optimistically update the 'Food' data
        queryClient.setQueryData<FoodLog[]>(
          ["foodlog", mealType, logDate],
          (previousFoodLog) => [...(previousFoodLog || []), newFood]
        );
      }
      return { previousFoodLog };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newFood, context) => {
      queryClient.setQueryData(
        ["foodlog", mealType, logDate],
        context?.previousFoodLog
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["foodlog"] });
    },
  });
};

export const useDeleteFoodLog = (mealType: string, logDate: string) => {
  const queryClient = useQueryClient(); // Get the query client instance
  return useMutation({
    mutationKey: ["foodlog", mealType, logDate],
    mutationFn: (foodId: number) => apiClient.delete(foodId),
    onMutate: async (foodId) => {
      await queryClient.cancelQueries({
        queryKey: ["foodlog", mealType, logDate],
      });

      // Snapshot the previous value
      const previousFoods = queryClient.getQueryData<FoodLog[]>([
        "foodlog",
        mealType,
      ]);

      // Optimistically update the 'foods' data
      queryClient.setQueryData(
        ["foodlog", mealType, logDate],
        (previousFoods: FoodLog[] | undefined) => {
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
      queryClient.setQueryData(
        ["foodlog", mealType, logDate],
        context?.previousFoods
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["foodlog", mealType, logDate],
      });
    },
  });
};
