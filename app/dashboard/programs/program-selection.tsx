"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useClientStore } from "@/lib/client-store";
import { getWeeksByWorkoutId } from "@/server/actions/get-weeks-by-workout-id";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "http";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import EditWorkout from "./edit-program";
import DeleteWorkout from "./delete-program";
import { set } from "zod";

type Workout = {
  workoutData: {
    id: string;
    title: string | null;
    weeks: {
      id: string;
      days: {
        id: string;
      }[];
    }[];
  }[];
};

const ProgramSelection = ({ workoutData }: Workout) => {
  const { workoutId, setWorkoutId } = useClientStore();
  const { setWeekId } = useClientStore();
  const { setDayId } = useClientStore();

  // we need to set the default workout id to the first workout id
  // as there will be no weeks otherwise, as we don't set the id for weeks until we click on the workout
  useEffect(() => {
    setWorkoutId(workoutData[0].id);
    setWeekId(workoutData[0].weeks[0].id);
    setDayId(workoutData[0].weeks[0].days[0].id);
  }, []);

  // const queryClient = useQueryClient();

  // queryClient.invalidateQueries({ queryKey: ["weeks", workoutId] });

  // useQuery({
  //   queryKey: ["weeks", workoutId],
  //   queryFn: () => getWeeksByWorkoutId({ workoutId }),
  // });

  // const [id, setId] = useState(workoutData[0].id);

  // useQuery({
  //   queryKey: ["weeks", id],
  //   queryFn: () => getWeeksByWorkoutId({ workoutId: id }),
  // });

  return (
    <RadioGroup
      defaultValue={workoutData[0].id}
      defaultChecked
      onValueChange={(value) => {
        setWorkoutId(value);
        setWeekId(workoutData[0].weeks[0].id);
        setDayId(workoutData[0].weeks[0].days[0].id);
      }}
    >
      {workoutData.map((workout) => (
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={workout.id} id={workout.id} />
          <Label htmlFor={workout.id} className="flex justify-between w-full">
            {workout.title}{" "}
            <div className="flex gap-1">
              <EditWorkout workout={workout} />
              <DeleteWorkout workout={workout} />
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
export default ProgramSelection;
