import { db } from "@/server";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";

type WorkoutPageParams = {
  params: {
    workoutId: string;
  };
};

const WorkoutPage = async ({ params }: WorkoutPageParams) => {
  const { workoutId } = params;
  const workout = await db.query.workouts.findFirst({
    where: eq(workouts.id, workoutId),
  });
  return <main>{workout?.title}</main>;
};
export default WorkoutPage;
