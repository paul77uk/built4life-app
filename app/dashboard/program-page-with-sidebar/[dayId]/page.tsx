import { db } from "@/server";
import { days } from "@/server/schema";
import { eq } from "drizzle-orm";
import CreateExercise from "../../day/[workoutId]/exercise/[dayId]/create-execise";
import { DataTable } from "../../day/[workoutId]/exercise/data-table";
import { columns } from "../../day/[workoutId]/exercise/columns";

type DayPageParams = {
  params: {
    dayId: string;
  };
};

const DayPage = async ({ params }: DayPageParams) => {
  const day = await db.query.days.findFirst({
    where: eq(days.id, params.dayId),
    with: {
      exercises: {
        orderBy: (exercises, { asc }) => [asc(exercises.created)],
        with: {
          sets: {
            orderBy: (sets, { asc }) => [asc(sets.created)],
          },
        },
      },
    },
  });
  return (
    <main>
      <div className="flex gap-2 items-center">
        {/* <MobileMenu workoutId={params.workoutId} /> */}
        <CreateExercise />
      </div>
      {day ? (
        <div className="mt-3.5">
          {day.exercises.map((exercise) => (
            <div className="mb-4" key={exercise.id}>
              <DataTable
                columns={columns}
                data={exercise.sets}
                exercise={exercise}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1>No exercises found</h1>
      )}
      <div>{}</div>
    </main>
  );
};
export default DayPage;
