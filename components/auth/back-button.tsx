"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonProps = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="font-medium w-full">
      <Link aria-label={label} href={href}></Link>
    </Button>
  );
};
