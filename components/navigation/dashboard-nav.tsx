"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({
  links,
}: {
  links: { label: string; path: string; icon: JSX.Element }[];
}) {
  const pathname = usePathname();
  return (
    <nav className=" bg-[#333333] w-full mb-3">
      <ul className="flex flex-wrap w-full justify-center text-xs uppercase font-semibold">
        {links.map((link) => (
          <Link
            key={link.path}
            className={cn(
              "flex gap-2 items-center p-3 text-white hover:text-primary",
              pathname === link.path && "bg-primary hover:text-white"
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
