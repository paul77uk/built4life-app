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
import { Plus } from "lucide-react";

const CreateForm = () => {
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
  });

  const { execute, status } = useAction(createWorkout, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Creating workout...");
    },
    onSettled: () => {
      toast.dismiss();
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof workoutSchema>) => {
    execute(values);
  };

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center uppercase text-xs gap-1 font-bold">
            <div>Program</div> <Plus size={18} />
          </Button>
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
export default CreateForm;
