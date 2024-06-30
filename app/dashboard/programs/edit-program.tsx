"use client";

import { workoutSchema } from "@/types/workout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { createWorkout } from "@/server/actions/create-workout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

type Workout = {
  workout: {
    id: string | undefined;
    title: string | null;
  };
};

const EditWorkout = ({ workout }: Workout) => {
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      id: workout.id,
      title: workout.title || "",
    },
  });

  const { execute, status } = useAction(createWorkout, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Editing workout...");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const onSubmit = (values: z.infer<typeof workoutSchema>) => {
    execute(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="text-primary cursor-pointer" size={14} />
      </DialogTrigger>
      <DialogContent>
        <Card className="border-0">
          <CardHeader>
            <CardTitle>Edit Workout</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Title</FormLabel>
                      <FormControl>
                        <Input placeholder="workout title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose asChild>
                  <Button
                    // isDirty is a hook that returns true if the form has been modified
                    disabled={
                      status === "executing" || !form.formState.isValid
                      // || !form.formState.isDirty
                    }
                    type="submit"
                  >
                    Submit
                  </Button>
                </DialogClose>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
export default EditWorkout;
