import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server";
import { auth } from "@/server/auth";
import Link from "next/link";
import CreateForm from "./create-form";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  const user = session.user;

  const workoutData = await db.query.workouts.findMany({
    // only want the signed in users workout at this point
    where: eq(workouts.userId, user.id),
    orderBy: (workouts, { asc }) => [asc(workouts.created)],
  });
  if (!workouts) throw new Error("No workouts found");

  return (
    <>
      <CreateForm />
      {workoutData.map((workout) => (
        <Link key={workout.id} href={`/dashboard/day/${workout.id}`}>
          <Card className="mt-3" key={workout.id}>
            <CardHeader>
              <CardTitle className="text-md">{workout.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </>
  );
};
export default Page;
