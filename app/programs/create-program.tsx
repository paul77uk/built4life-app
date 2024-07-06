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

import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createProgram } from "./actions/create-program";
import { useQueryClient } from "@tanstack/react-query";

const CreateProgram = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    mode: "onChange",
  });

  const { execute, status } = useAction(createProgram, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["workouts"] });
      }
    },
    onExecute: (data) => {
      toast.loading("Creating workout...");
    },
    onSettled: () => {
      toast.dismiss();
      // form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof workoutSchema>) => {
    execute(values);
  };

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Plus size={22} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Create Workout</CardTitle>
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
                  <FormField
                    control={form.control}
                    name="totalWeeks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of weeks</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="number of weeks"
                            {...field}
                            type="number"
                            min={0}
                          />
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
    </main>
  );
};
export default CreateProgram;
