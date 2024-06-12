"use client";

import { Button } from "@/components/ui/button";
import { useClientStore } from "@/lib/client-store";
import { getExerciseByDayId } from "@/server/actions/get-exercise-by-day-id";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DayBtnProps = {
  dayNumber: string | null;
  dayId: string;
};

const DayBtn = ({ dayNumber, dayId }: DayBtnProps) => {
  const queryClient = useQueryClient();

  const { mutate: server_getExerciseById } = useMutation({
    mutationFn: getExerciseByDayId,
    onSuccess: (data) => {
      queryClient.setQueryData(["exercises"], data);
    },
  });

  return (
    <Button
      onClick={() => {
        server_getExerciseById({ dayId });
      }}
    >
      Day {dayNumber}
    </Button>
  );
};
export default DayBtn;
