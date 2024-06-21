import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server";
import { auth } from "@/server/auth";
import Link from "next/link";
import CreateForm from "./create-form";
import { days, weeks, workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Delete, Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { deleteWorkout } from "@/server/actions/delete-workout";
import { toast } from "sonner";
import DeleteWorkoutBtn from "./delete-workout-btn";
import EditWorkout from "./edit-workout";

const Page = async () => {
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
          },
        },
      },
    },
  });

  // if (!workouts) throw new Error("No workouts found");

  return (
    <main >
      <CreateForm />
      {workoutData.map((workout) => (
        <div key={workout.id}>
          <Card className="mt-3" key={workout.id}>
            <CardHeader>
              <CardTitle className="text-md flex justify-between items-center">
                {/* links to first day of first week of workout by default */}
                <Link
                  href={`/dashboard/day/${workout.id}/exercise/${workout.weeks[0].days[0].id}`}
                >
                  {workout.title}
                </Link>
                <div className="flex gap-2 ">
                  <EditWorkout workout={workout} />
                  <DeleteWorkoutBtn workout={workout} />
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      ))}
    </main>
  );
};
export default Page;
