import { create } from "zustand";

interface Calories {
  breakfastCalorie: number;
  lunchCalorie: number;
  dinnerCalorie: number;
}

export interface CalorieDateStore {
  calories: Calories;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setBreakfastCalorie: (breakfastCalorie: number) => void;
  setLunchCalorie: (lunchCalorie: number) => void;
  setDinnerCalorie: (dinnerCalorie: number) => void;
}

const useCalorieDateStore = create<CalorieDateStore>((set) => ({
  calories: { breakfastCalorie: 0, lunchCalorie: 0, dinnerCalorie: 0 },
  selectedDate: new Date(),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setBreakfastCalorie: (breakfastCalorie) =>
    set((state) => ({
      calories: { ...state.calories, breakfastCalorie: breakfastCalorie },
    })),
  setLunchCalorie: (lunchCalorie) =>
    set((state) => ({
      calories: { ...state.calories, lunchCalorie: lunchCalorie },
    })),
  setDinnerCalorie: (dinnerCalorie) =>
    set((state) => ({
      calories: { ...state.calories, dinnerCalorie: dinnerCalorie },
    })),
  
}));

export default useCalorieDateStore;
