"use client";

import { workoutSchema, zWorkoutSchema } from "@/types/workout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,

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
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { PenSquareIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";



const EditProgram = ({ id, title }: zWorkoutSchema) => {
    const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      id,
      title,
    },
  });

  const { execute, status } = useAction(createWorkout, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
         queryClient.invalidateQueries({ queryKey: ["workouts"] });
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
        <PenSquareIcon className="cursor-pointer" />
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
export default EditProgram;
