"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { exerciseSchema } from "@/types/exercise-schema";
import { createExercise } from "@/server/actions/create-exercises";
import { Plus } from "lucide-react";
import { useClientStore } from "@/lib/client-store";

const CreateExercise = () => {
  const { workoutId } = useClientStore();
  const { dayId } = useClientStore();

  const form = useForm<z.infer<typeof exerciseSchema>>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
     
      name: "",
      dayId: dayId as string,
    },
    mode: "onChange",
  });
  const { execute, status } = useAction(createExercise, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
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
      {dayId && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add Exercise
              <Plus className="ml-2" />
            </Button>
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
      )}
    </>
  );
};
export default CreateExercise;
