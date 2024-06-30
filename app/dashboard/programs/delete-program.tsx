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
import { deleteWorkout } from "@/server/actions/delete-workout";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type WorkoutProps = {
  workout: {
    id: string;
  };
};

const DeleteWorkout = ({ workout }: WorkoutProps) => {
  const { status, execute } = useAction(deleteWorkout, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
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
        <Trash2 className="text-primary cursor-pointer" size={14} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this workout?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workout and all it&apos;s data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => execute({ id: workout.id })}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteWorkout;
