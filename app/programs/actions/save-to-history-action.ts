import { set } from 'zod';
"use server";

import { Exercises, Sets } from "@/lib/infer-types";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { exerciseHistory, setHistory, workoutHistory } from "@/server/schema";

export const saveToHistory = async ({
  workoutName,
  exercise,
  sets,
}: {
  workoutName: string;
  exercise: Exercises;
  sets: Sets[];
}) => {
  const session = await auth();
  if (!session) {
    return { error: `Not authorized` };
  }
  const user = session.user;

  const newWorkoutHistory = await db
    .insert(workoutHistory)
    .values({
      workoutName,
      userId: user.id,
    })
    .returning();

 
    const newExerciseHistory = await db
      .insert(exerciseHistory)
      .values({
        exerciseName: exercise.name,
        workoutHistoryId: newWorkoutHistory[0].id,
      })
      .returning();
  

  for (const set of sets) {
    await db.insert(setHistory).values({
      exerciseHistoryId: newExerciseHistory[0].id,
      setNumber: set.setNumber,
      weight: set.weight,
      reps: set.reps,
    });
  }

  return { success: `Saved workout to history` };
};
