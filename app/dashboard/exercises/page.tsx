"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useClientStore } from "@/lib/client-store";
import { getDayById } from "@/server/actions/get-current-day";
import { getExerciseByDayId } from "@/server/actions/get-exercise-by-day-id";
import { getWeeksByWorkoutId } from "@/server/actions/get-weeks-by-workout-id";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../day/[workoutId]/exercise/data-table";
import { columns } from "../day/[workoutId]/exercise/columns";
import CreateExercise from "./create-exercise";

const ExercisesPage = () => {
  const { dayId } = useClientStore();

  const { data } = useQuery({
    queryKey: ["exercises", dayId],
    queryFn: async () => await getExerciseByDayId({ dayId }),
  });

  console.log(data);

  if (!data) return null;
  return (
    <main>
      <div className="flex gap-2 items-center">
        {/* <MobileMenu workoutId={params.workoutId} /> */}
        <CreateExercise />
      </div>

      <div className="mt-3.5">
        {data.map((exercise) => (
          <div className="mb-4" key={exercise.id}>
            <DataTable
              columns={columns}
              data={exercise.sets}
              exercise={exercise}
            />
          </div>
        ))}
      </div>

      <div>{}</div>
    </main>
  );
};
export default ExercisesPage;
