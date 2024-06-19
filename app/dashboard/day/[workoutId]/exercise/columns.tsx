"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteSet } from "@/server/actions/delete-set";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteExercise } from "@/server/actions/delete-exercise";
import { Trash2 } from "lucide-react";
import DeleteSet from "./[dayId]/delete-set";
import EditSet from "./[dayId]/edit-set";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Set = {
  id: string;
  setNumber: string | null;
  weight: string | null;
  reps: string | null;
  exerciseId: string;
};

// TODO: change to are you sure you want to delete this set alert when click on delete, like n the workout page

const ActionCell = ({ row }: { row: Row<Set> }) => {
  const set = row.original;

  return (
    <div className="flex gap-2 items-center">
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
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];
