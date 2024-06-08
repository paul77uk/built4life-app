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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { createWorkout } from "@/server/actions/create-workout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateForm = () => {
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { execute, status } = useAction(createWorkout, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        router.push("/dashboard/workouts");
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Creating workout...");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const onSubmit = (values: z.infer<typeof workoutSchema>) => {
    execute(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CreateForm;
