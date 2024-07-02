import DayBtn from "@/app/dashboard/day/[workoutId]/day-btn";
import ProgramsSidebar2 from "@/app/programs/programs-sidebar1";
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

const MobileMenu = () => {
  // const pathname = usePathname();

  // const dayId = pathname.split("/").pop();
  // const workoutId = pathname.split("/")[3];

  return (
    <div className="flex sm:hidden bg-primary rounded p-1 mt-0.5 absolute top-4 left-3">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[300px]">
          <ProgramsSidebar2 />
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileMenu;
