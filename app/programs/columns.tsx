"use client";

import { ColumnDef, Row } from "@tanstack/react-table";

import { Sets } from "@/lib/infer-types";
import EditSet from "../sets/edit-set";
import DeleteSet from "../sets/delete-set";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const ActionCell = ({ row }: { row: Row<Sets> }) => {
  const set = row.original;

  return (
    <div className="flex gap-2 items-center justify-center">
      <EditSet set={set} />
      <DeleteSet set={set} />
    </div>
  );
};

export const columns: ColumnDef<Sets>[] = [
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
