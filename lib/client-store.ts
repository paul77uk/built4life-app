import { workouts } from "@/server/schema";
import { db } from "@/server";
import { create } from "zustand";

type ClientStore = {
  workoutId: string;
  setWorkoutId: (workoutId: string) => void;
  weekId: string;
  setWeekId: (weekId: string) => void;
  dayId: string;
  setDayId: (dayId: string) => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  workoutId: "",
  setWorkoutId: (workoutId: string) => set({ workoutId }),
  weekId: "",
  setWeekId: (weekId: string) => set({ weekId }),
  dayId: "",
  setDayId: (dayId: string) => set({ dayId }),
}));

// const { dayId, setDayId } = useClientStore();
// onClick={() => setDayId("123")}
// console.log(dayId);
