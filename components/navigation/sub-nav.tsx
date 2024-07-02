"use client";

import { cn } from "@/lib/utils";
import {
  BarChart,
  BookOpenText,
  Dumbbell,
  Medal,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";

export default function SubNav() {
  const pathname = usePathname();

  const links = [
    {
      label: "Programs",
      path: "/programs",
      icon: <Dumbbell size={16} />,
    },
    {
      label: "Records",
      path: "/records",
      icon: <Medal size={16} />,
    },
    {
      label: "History",
      path: "/history",
      icon: <BookOpenText size={16} />,
    },
    {
      label: "Charts",
      path: "/charts",
      icon: <BarChart size={16} />,
    },

    {
      label: "Settings",
      path: "/settings",
      icon: <Settings size={16} />,
    },
  ];

  return (
    <nav className=" bg-[#333333] w-full">
      <ul className="flex flex-wrap w-full justify-center text-xs uppercase font-semibold">
        {links.map((link) => (
          <Link
            key={link.path}
            className={cn(
              "flex gap-2 items-center p-3 text-white hover:text-primary",

              pathname.includes(link.path) && "bg-primary hover:text-white"
            )}
            href={link.path}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
