import { auth } from "@/server/auth";
import ClientPage from "./[dayId]/page";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { workouts } from "@/server/schema";
import ProgramPage from "./client-page";

const ServerPage = async () => {
  const session = await auth();
  // if (!session) throw new Error("Not authenticated");
  if (!session) return null;
  const user = session.user;

  const workoutData = await db.query.workouts.findMany({
    // only want the signed in users workout at this point
    where: eq(workouts.userId, user.id),
    orderBy: (workouts, { asc }) => [asc(workouts.created)],
    with: {
      weeks: {
        orderBy: (weeks, { asc }) => [asc(weeks.number)],
        with: {
          days: {
            orderBy: (days, { asc }) => [asc(days.number)],
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
          },
        },
      },
    },
  });
  return <ProgramPage workoutData={workoutData} />;
};
export default ServerPage;
