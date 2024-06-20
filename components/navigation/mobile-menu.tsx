"use client";

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

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <span
      className={
        pathname.includes("/dashboard/day/")
          ? "max-[375px]:block hidden"
          : "hidden"
      }
    >
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>It works</SheetContent>
      </Sheet>
    </span>
  );
};
export default MobileMenu;
