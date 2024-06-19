import { db } from "@/server";

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
        {weeksData.map((week) => (
          <div key={week.id}>
            <Button>Week {week.number}</Button>
            <div className="flex flex-col gap-2 pt-2">
              {week.days.map((day) => (
                <div key={day.id}>
                  {/* <DayBtn dayNumber={day.number} dayId={day.id} /> */}
                  <Link href={`/dashboard/day/${workoutId}/exercise/${day.id}`}>
                    <DayBtn day={day} workoutId={workoutId}/>
                  </Link>
                  {/* <ul>
                    {day.exercises.map((exercise) => (
                      <li key={exercise.id}>{exercise.name}</li>
                    ))}
                  </ul> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>{children}</div>
    </main>
  );
}
