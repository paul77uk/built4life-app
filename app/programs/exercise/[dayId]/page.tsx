import { Days, Exercises } from "@/lib/infer-types";

import { DataTable } from "../../data-table";
import { columns } from "../../columns";
import CreateExercise from "../../create-exercise";
import { getExerciseByDayId } from "../../actions/get-exercise-by-day-id";
import MobileMenu from "@/components/navigation/mobile-menu";

const ExercisePage = async ({ params }: { params: { dayId: string } }) => {
  const exercises = await getExerciseByDayId({ dayId: params.dayId });

  return (
    <main>
      <MobileMenu />
      <CreateExercise dayId={params.dayId} />
      {exercises.map((exercise: Exercises) => {
        return (
          <div className="mb-4" key={exercise.id}>
            <DataTable
              columns={columns}
              data={exercise.sets}
              exercise={exercise}
            />
          </div>
        );
      })}
    </main>
  );
};
export default ExercisePage;
