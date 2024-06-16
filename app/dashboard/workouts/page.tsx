import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server";
import { auth } from "@/server/auth";
import Link from "next/link";
import CreateForm from "./create-form";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Delete, Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div key={workout.id}>
          <Card className="mt-3" key={workout.id}>
            <CardHeader>
              <CardTitle className="text-md flex justify-between items-center">
                <Link href={`/dashboard/day/${workout.id}`}>
                  {workout.title}
                </Link>
                <div className="flex gap-2 ">
                  <Button className="w-8 h-8 p-0">
                    <Pencil size={16} />
                  </Button>
                  <Button className="w-8 h-8 p-0">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      ))}
    </>
  );
};
export default Page;
