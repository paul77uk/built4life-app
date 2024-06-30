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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import DayBtn from "../day/[workoutId]/day-btn";


const WorkoutLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

  // if (!workouts) throw new Error("No workouts found");

  return (
    <main className="flex gap-5">
      <div>
        <CreateForm />
        <Accordion type="single" collapsible className="w-full">
          {workoutData.map((workout) => (
            <AccordionItem key={workout.id} value={workout.id} className="pt-2">
              <Button asChild className="flex items-center justify-between gap-3 w-[280px]">
                <div>
                  <div className="font-bold uppercase text-sm">
                    {workout.title}
                  </div>
                  <div className="flex gap-2 items-center">
                    <EditWorkout workout={workout} />
                    <DeleteWorkoutBtn workout={workout} />
                    <AccordionTrigger />
                  </div>
                </div>
              </Button>

              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {workout.weeks.map((week) => (
                    <AccordionItem value={week.id} key={week.id} className="mt-1.5">
                      <Button className="flex items-center gap-2">
                        <div>Week {week.number}</div>
                        <AccordionTrigger />
                      </Button>

                      <AccordionContent>
                        {week.days.map((day) => (
                          <div className="pt-1" key={day.id}>
                            <Link href={`/dashboard/workouts/${day.id}`}>
                              <Button>Day {day.number}</Button>
                            </Link>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div>{children}</div>
    </main>
  );
};
export default WorkoutLayout;
