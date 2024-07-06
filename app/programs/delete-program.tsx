"use client";

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
import { Button } from "@/components/ui/button";

import { zWorkoutSchema } from "@/types/workout-schema";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { deleteProgram } from "./actions/delete-program";
import { Weeks, Workouts } from "@/lib/infer-types";

const DeleteProgram = ({ id, title }: Partial<Workouts>) => {
  const queryClient = useQueryClient();
  const { status, execute } = useAction(deleteProgram, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["workouts"] });
      }
    },
    onExecute: (data) => {
      toast.loading("Deleting workout...");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workout and all it&apos;s data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => execute({ id: id as string })}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteProgram;
