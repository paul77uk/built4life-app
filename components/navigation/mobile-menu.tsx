import DayBtn from "@/app/dashboard/day/[workoutId]/day-btn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { weeks } from "@/server/schema";
import Link from "next/link";

type Params = {
  workoutId: string;
};

const MobileMenu = async ({ workoutId }: Params) => {
  // const pathname = usePathname();

  // const dayId = pathname.split("/").pop();
  // const workoutId = pathname.split("/")[3];
  const weeksData = await db.query.weeks.findMany({
    with: {
      days: true,
    },
    where: eq(weeks.workoutId, workoutId),
  });

  return (
    <span className="max-[375px]:block hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
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
                    <AccordionTrigger className="flex gap-1 bg-primary py-1.5 px-3 rounded w-full text-white">
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
          </main>
        </SheetContent>
      </Sheet>
    </span>
  );
};
export default MobileMenu;
