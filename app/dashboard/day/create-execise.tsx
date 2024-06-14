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
import { useParams, useRouter } from "next/navigation";
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
import { exerciseSchema } from "@/types/exercise-schema";
import { createExercise } from "@/server/actions/create-exercises";
import { useClientStore } from "@/lib/client-store";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

const CreateExercise = () => {
  type Exercise = {
    id: string;
    name: string;
    dayId: string;
  };

  type Day = {
    id: string;
  };

  // const { data } = useQuery<Exercise[]>({
  //   queryKey: ["exercises"],
  // });

  const { data } = useQuery<Day>({
    queryKey: ["day"],
  });

  // console.log("ddd", data);

  const { workoutId } = useParams();

  // const { dayId } = useClientStore();

  const form = useForm<z.infer<typeof exerciseSchema>>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      workoutId: workoutId as string,
      name: "",
      dayId: data?.id as string,
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
    values.dayId = data?.id as string;
    console.log(values);
    execute(values);
  };

  return (
    <>
      {data && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add Exercise
              <Plus className="ml-2"/>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] ">
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
