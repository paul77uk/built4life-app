import { Days, Exercises } from "@/lib/infer-types";

import { DataTable } from "../../data-table";
import { columns } from "../../columns";
import CreateExercise from "../../create-exercise";
import { getExerciseByDayId } from "../../actions/get-exercise-by-day-id";
import MobileMenu from "@/components/navigation/mobile-menu";
import SaveToHistory from "../save-to-history";
import { getProgramsByUserId } from "../../actions/get-programs-by-user-id";

const ExercisePage = async ({ params }: { params: { dayId: string } }) => {
  const exercises = await getExerciseByDayId({ dayId: params.dayId });

  const programs = await getProgramsByUserId();

  return (
    <main className="ms-5">
      <MobileMenu />
      {exercises.length > 0 && (
        <div>
          {exercises[0].day.week.workout.title} / Week{" "}
          {exercises[0].day.week.number} / Day {exercises[0].day.number}
        </div>
      )}

      {programs && programs.length > 0 && (
        <CreateExercise dayId={params.dayId} />
      )}
      {exercises.length > 0 && (
        <div>
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
        </div>
      )}
    </main>
  );
};
export default ExercisePage;
