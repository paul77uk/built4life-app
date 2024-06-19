import { db } from "@/server";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { eq } from "drizzle-orm";
import { weeks } from "@/server/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DayBtn from "./day-btn";

type Params = {
  workoutId: string;
};

export default async function DayLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const { workoutId } = params;
  const weeksData = await db.query.weeks.findMany({
    with: {
      days: true,
    },
    where: eq(weeks.workoutId, workoutId),
  });
  return (
    <main className="flex gap-5">
      <div className="flex flex-col gap-3">
        <Accordion
          defaultValue={weeksData[0].id}
          type="single"
          collapsible
          className="w-full"
        >
          {weeksData.map((week) => (
            <AccordionItem value={week.id} key={week.id}>
              <AccordionTrigger className="flex gap-1 bg-primary py-1.5 px-3 rounded w-full">
                <div>Week</div> {week.number}
              </AccordionTrigger>
              <div className="flex flex-col my-1">
                {week.days.map((day) => (
                  <AccordionContent key={day.id}>
                    {/* <DayBtn dayNumber={day.number} dayId={day.id} /> */}
                    <Link
                      href={`/dashboard/day/${workoutId}/exercise/${day.id}`}
                    >
                      <DayBtn day={day} workoutId={workoutId} />
                    </Link>
                    {/* <ul>
                    {day.exercises.map((exercise) => (
                      <li key={exercise.id}>{exercise.name}</li>
                    ))}
                  </ul> */}
                  </AccordionContent>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div>{children}</div>
    </main>
  );
}
