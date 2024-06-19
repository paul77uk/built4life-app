'use client'

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type DayBtnProps = {
  day: {
    id: string;
    number: string | null;
  }
  workoutId: string;
};

const DayBtn = ({day, workoutId} : DayBtnProps ) => {
  const pathname = usePathname();
  return <Button className={`/dashboard/day/${workoutId}/exercise/${day.id}` === pathname ? 'bg-secondary hover:bg-secondary' : 'bg-primary'}>Day {day.number} </Button>;
}
export default DayBtn