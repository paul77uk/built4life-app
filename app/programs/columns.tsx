"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import EditSet from "../dashboard/day/[workoutId]/exercise/[dayId]/edit-set";
import DeleteSet from "../dashboard/day/[workoutId]/exercise/[dayId]/delete-set";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Set = {
  id: string;
  setNumber: string | null;
  weight: string | null;
  reps: string | null;
  exerciseId: string;
};

const ActionCell = ({ row }: { row: Row<Set> }) => {
  const set = row.original;

  return (
    <div className="flex gap-2 items-center justify-center">
      <EditSet set={set} />
      <DeleteSet set={set} />
    </div>
  );
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
    // cell: ({ row }) => (
    //   <div className="text-left">{row.original.reps}</div>
    // ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];
