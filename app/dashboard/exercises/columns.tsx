"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Set = {
  setNumber: string | null;
  weight: string | null;
  reps: string | null;
};

export const columns: ColumnDef<Set>[] = [
  {
    accessorKey: "setNumber",
    header: "Set",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "reps",
    header: "reps",
  },
  {
    id: "actions",
    header: "Actions",
  },
];
