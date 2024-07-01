import { Days, Exercises } from "@/lib/infer-types";
import { getExerciseByDayId } from "@/server/actions/get-exercise-by-day-id";
import { DataTable } from "../../data-table";
import { columns } from "../../columns";
import CreateExercise from "../../create-exercise";

const ExercisePage = async ({ params }: { params: { dayId: string } }) => {
  const exercises = await getExerciseByDayId({ dayId: params.dayId });
  return (
    <main>
      <CreateExercise dayId={params.dayId} />
      {exercises.map((exercise: any) => {
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
