import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import CreateProgram from "./create-program";
import EditProgram from "./edit-program";
import DeleteProgram from "./delete-program";

const ProgramsSidebar2 = async () => {
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

  return (
    <Accordion type="multiple" className="w-[260px]">
      <div className="uppercase text-[#64748B] mb-3 flex gap-1">
        Programs <CreateProgram />
      </div>
      {workoutData.map((workout) => (
        <AccordionItem className="ms-5" key={workout.id} value={workout.id}>
          <AccordionTrigger>
            <div className="flex gap-2 justify-start text-slate-500 items-center">
              <div className="flex gap-1 items-center">
                <EditProgram id={workout.id} title={workout.title} />
                <DeleteProgram id={workout.id} title={workout.title} />
              </div>
              {workout.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="ms-5">
            <div className="uppercase text-[#64748B]">Weeks</div>

            {workout.weeks.map((week) => (
              <AccordionItem key={week.id} value={week.id}>
                <AccordionTrigger className="ms-5 text-[#9a9da3]">
                  Week {week.number}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ms-10 uppercase text-[#64748B]">Days</div>
                  {week.days.map((day) => (
                    <Link href={`/programs/exercise/${day.id}`} key={day.id}>
                      <AccordionItem
                        key={day.id}
                        value={day.id}
                        className="ms-16 text-[#9a9da3] my-2 cursor-pointer"
                      >
                        Day {day.number}
                      </AccordionItem>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default ProgramsSidebar2;
