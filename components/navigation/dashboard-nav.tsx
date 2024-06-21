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
    <nav className="mb-4 bg-[#333333]">
      <ul className="flex flex-wrap justify-center text-xs uppercase font-semibold">
        {links.map((link) => (
          <Link
            className={cn(
              "flex gap-2 items-center relative p-3 text-white",
              pathname === link.path && "bg-primary"
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
