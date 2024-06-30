import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server";
import { auth } from "@/server/auth";
import Link from "next/link";

import { days, weeks, workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Delete, Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { deleteWorkout } from "@/server/actions/delete-workout";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import DayBtn from "../day/[workoutId]/day-btn";
import EditWorkout from "../workouts/edit-workout";
import DeleteWorkoutBtn from "../workouts/delete-workout-btn";
import CreateForm from "../workouts/create-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProgramSelection from "./program-selection";
import WeeksPage from "../weeks/page";
import DaysPage from "../days/page";
import { revalidatePath } from "next/cache";

const ProgramLayout = async ({
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
    <main className="flex gap-14">
      <div>
        <CreateForm />
        <Accordion
          type="multiple"
          className="w-full pt-3"
          defaultValue={["item-1", "item-2", "item-3"]}
        >
          <AccordionItem value="item-1" className="w-[230px]">
            <AccordionTrigger className="font-bold uppercase text-sm">
              Program
            </AccordionTrigger>
            <AccordionContent className="mb-5">
              <ProgramSelection workoutData={workoutData} />
            </AccordionContent>
            <Separator className="h-[0.5px] bg-white" />
          </AccordionItem>

          <AccordionItem value="item-2" className="w-[230px]">
            <AccordionTrigger className="font-bold uppercase text-sm">
              Week
            </AccordionTrigger>
            <AccordionContent className="mb-5">
              <WeeksPage />
            </AccordionContent>
            <Separator className="h-[0.5px] bg-white" />
          </AccordionItem>

          <AccordionItem value="item-3" className="w-[230px]">
            <AccordionTrigger className="font-bold uppercase text-sm">
              Day
            </AccordionTrigger>
            <AccordionContent className="mb-5">
              <DaysPage />
            </AccordionContent>
            <Separator className="h-[0.5px] bg-white" />
          </AccordionItem>
        </Accordion>
      </div>
      <div>{children}</div>
    </main>
  );
};
export default ProgramLayout;
