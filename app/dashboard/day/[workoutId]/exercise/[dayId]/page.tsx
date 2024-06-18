import { DataTable } from "@/app/dashboard/day/[workoutId]/exercise/data-table";
import { Button } from "@/components/ui/button";
import { db } from "@/server";
import { days } from "@/server/schema";
import { eq, or } from "drizzle-orm";
import { columns } from "../columns";
import CreateExercise from "./create-execise";
import { Pencil, Plus, Trash, Trash2 } from "lucide-react";
import AddSet from "./add-set";

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
        with: {
          sets: {
            orderBy: (sets, { asc }) => [asc(sets.setNumber)],
          },
        },
      },
    },
  });

  return (
    <main>
      <CreateExercise />
      {day ? (
        <div className="mt-3.5">
          {day.exercises.map((exercise) => (
            <div className="mb-4" key={exercise.id}>
              <Button className="flex justify-between w-full  border-secondary-foreground border-t border-x rounded-b-none">
                {exercise.name}
                <div className="flex gap-1 items-center">
                  <AddSet exercise={exercise} />
                  <Pencil size={16} />
                  <Trash2 size={16} />
                </div>
              </Button>
              <DataTable columns={columns} data={exercise.sets} />
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
