import { Button } from "@/components/ui/button";
import { db } from "@/server";
import { weeks } from "@/server/schema";
import { eq } from "drizzle-orm";

import Link from "next/link";
import DayBtn from "../day-btn";
import DayPage from "../page";

type WorkoutPageParams = {
  params: {
    workoutId: string;
  };
};

const WorkoutPage = async ({ params }: WorkoutPageParams) => {
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
                 <DayBtn dayNumber={day.number} dayId={day.id} />
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
      <div><DayPage/></div>
    </main>
  );
};
export default WorkoutPage;
