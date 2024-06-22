import { DataTable } from "@/app/dashboard/day/[workoutId]/exercise/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/server";
import { days } from "@/server/schema";
import { eq, or } from "drizzle-orm";
import { columns } from "../columns";
import CreateExercise from "./create-execise";
import { Pencil, Plus, Trash, Trash2 } from "lucide-react";
import AddSet from "./add-set";
import EditExercise from "./edit-exercise";
import DeleteExercise from "./delete-exercise";
import MobileMenu from "@/components/navigation/mobile-menu";

type Params = {
  params: {
    workoutId: string;
    dayId: string;
  };
};

const DayPage = async ({ params }: Params) => {
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
