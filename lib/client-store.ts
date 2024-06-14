import { db } from "@/server";
import { create } from "zustand";

type ClientStore = {
  dayId: string;
  setDayId: (dayId: string) => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  dayId: '',
  setDayId: (dayId: string) => set({ dayId }),
}));

// const { dayId, setDayId } = useClientStore();
// onClick={() => setDayId("123")}
// console.log(dayId);
