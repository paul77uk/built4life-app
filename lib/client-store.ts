import { exercises } from "./../server/schema";
import { set } from "zod";
import { db } from "@/server";
import { create } from "zustand";

type ClientStore = {
  exercises: any[];
  setExercises: (exercises: any[]) => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
}));

// const { dayId, setDayId } = useClientStore();
// onClick={() => setDayId("123")}
// console.log(dayId);
