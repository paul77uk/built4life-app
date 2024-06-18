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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Set = {
  id: string;
  setNumber: string | null;
  weight: string | null;
  reps: string | null;
};

// TODO: change to are you sure you want to delete this set alert when click on delete, like n the workout page

const ActionCell = ({ row }: { row: Row<Set> }) => {
  const { status, execute } = useAction(deleteSet, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Deleting Set...");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
  const set = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-1 ml-3 h-7 w-7">
          <MoreHorizontal size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="focus:bg-primary focus:text-white cursor-pointer">
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => execute({ id: set.id })}
          className="focus:bg-primary focus:text-white cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
