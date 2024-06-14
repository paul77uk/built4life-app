"use client";

import { Button } from "@/components/ui/button";
import { useClientStore } from "@/lib/client-store";
import { getDayById } from "@/server/actions/get-current-day";
import { getExerciseByDayId } from "@/server/actions/get-exercise-by-day-id";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { set } from "zod";

type DayBtnProps = {
  dayNumber: string | null;
  dayId: string;
};

const DayBtn = ({ dayNumber, dayId }: DayBtnProps) => {
  const queryClient = useQueryClient();

  // const { setDayId } = useClientStore();

  const { mutate: server_getExerciseById } = useMutation({
    mutationFn: getExerciseByDayId,
    onSuccess: (data) => {
      queryClient.setQueryData(["exercises"], data);
    },
  });

const { mutate: server_getDayById } = useMutation({
  mutationFn: getDayById,
  onSuccess: (data) => {
    queryClient.setQueryData(["day"], data);
  },
});

  return (
    <Button
      onClick={() => {
        server_getExerciseById({ dayId });
        server_getDayById({ id: dayId });
        
      }}
    >
      Day {dayNumber}
    </Button>
  );
};
export default DayBtn;
