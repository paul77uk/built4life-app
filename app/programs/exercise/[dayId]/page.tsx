import { Days, Exercises } from "@/lib/infer-types";

import { DataTable } from "../../data-table";
import { columns } from "../../columns";
import CreateExercise from "../../create-exercise";
import { getExerciseByDayId } from "../../actions/get-exercise-by-day-id";
import MobileMenu from "@/components/navigation/mobile-menu";
import SaveToHistory from "../save-to-history";

const ExercisePage = async ({ params }: { params: { dayId: string } }) => {
  const exercises = await getExerciseByDayId({ dayId: params.dayId });

  return (
    <main className="ms-5">
      <MobileMenu />
      <div>
        {exercises[0].day.week.workout.title} / Week{" "}
        {exercises[0].day.week.number} / Day {exercises[0].day.number}
      </div>
      <CreateExercise dayId={params.dayId} />
      {exercises.map((exercise: Exercises) => {
        return (
          <div className="mb-4" key={exercise.id}>
            <DataTable
              columns={columns}
              data={exercise.sets}
              exercise={exercise}
            />
            <SaveToHistory
              workoutTitle={exercises[0].day.week.workout.title}
              exercise={exercise}
              sets={exercise.sets}
            />
          </div>
        );
      })}
    </main>
  );
};
export default ExercisePage;
