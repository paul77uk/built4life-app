"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";

import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { exerciseSchema, zExerciseSchema } from "@/types/exercise-schema";
import { createExercise } from "@/server/actions/create-exercises";
import { PlusSquare } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const CreateExercise = ({ dayId }: Partial<zExerciseSchema>) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof exerciseSchema>>({
    mode: "onChange",
  });

  form.setValue("dayId", dayId as string);

  const { execute, status } = useAction(createExercise, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["workouts"] });
      }
    },
    onExecute: (data) => {
      toast.loading("Creating Exercise...");
    },
    onSettled: () => {
      toast.dismiss();
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof exerciseSchema>) => {
    console.log(values);
    execute(values);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex gap-2 border w-fit text-primary border-primary rounded p-2 ms-5 mt-4 bg-black md:ml-[282px]">
            Exercise
            <PlusSquare size={22} className="cursor-pointer" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Create Exercise</CardTitle>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise Name</FormLabel>
                        <FormControl>
                          <Input placeholder="exercise name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numSet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Sets</FormLabel>
                        <FormControl>
                          <Input placeholder="number of sets" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight</FormLabel>
                        <FormControl>
                          <Input placeholder="weight" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reps</FormLabel>
                        <FormControl>
                          <Input placeholder="reps" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogClose>
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
    </>
  );
};
export default CreateExercise;
