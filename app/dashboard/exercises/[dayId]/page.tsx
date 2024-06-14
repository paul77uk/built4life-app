"use client";

import { db } from "@/server";
import { useParams } from "next/navigation";
import { DataTable } from "../data-table";
import { eq } from "drizzle-orm";
import { sets } from "@/server/schema";
import { columns } from "../columns";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import CreateExercise from "../../day/create-execise";

type Exercise = {
  id: string;
  name: string | null;
  created: Date | null;
  dayId: string;
  sets: {
    id: string;
    created: Date | null;
    exerciseId: string;
    setNumber: string | null;
    weight: string | null;
    reps: string | null;
  }[];
};

const ExercisePage = () => {
  const { data } = useQuery<Exercise[]>({ queryKey: ["exercises"] });
  console.log("exercises", data);
  // const exerciseId = "1";
  // const setsData = await db.query.sets.findMany({
  //   where: eq(sets.exerciseId, exerciseId),
  // });

  // const dataTable = data?.map((exercise) => {
  //   exercise.sets.map((set) => {
  //     return {
  //       setNumber: set.setNumber,
  //       weight: set.weight,
  //       reps: set.reps,
  //     };
  //   });
  // });

  // const datatable = setsData.map((set) => {
  //   return {
  //     setNumber: set.setNumber,
  //     weight: set.weight,
  //     reps: set.reps,
  //   };
  // });

  // if (!dataTable) throw new Error("No data");

  return (
    <main>
      <CreateExercise/>
      {data ? (
        <div className="mt-3">
          {data.map((exercise) => (
            <div className="pb-4" key={exercise.id}>
              <Button className="w-full  border-secondary-foreground border-t border-x rounded-b-none">
                {exercise.name}
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
export default ExercisePage;
