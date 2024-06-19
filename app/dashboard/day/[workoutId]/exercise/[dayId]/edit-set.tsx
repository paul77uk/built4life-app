"use client";

import { Pencil, Plus } from "lucide-react";
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
import { setSchema } from "@/types/set-schema";
import { createSet } from "@/server/actions/create-set";

type SetProps = {
  set: {
    id: string;
    setNumber: string | null;
    weight: string | null;
    reps: string | null;
    exerciseId: string;
  };
};

const EditSet = ({ set }: SetProps) => {
  const form = useForm<z.infer<typeof setSchema>>({
    resolver: zodResolver(setSchema),
    defaultValues: {
      id: set.id,
      setNumber: set.setNumber as string,
      weight: set.weight as string,
      reps: set.reps as string,
      exerciseId: set.exerciseId,
    },
    mode: "onChange",
  });
  const { execute, status } = useAction(createSet, {
    onSuccess(data) {
      if (data?.error) toast.error(data.error);
      if (data?.success) {
        toast.success(data.success);
      }
    },
    onExecute: (data) => {
      toast.loading("Editing Set...");
    },
    onSettled: () => {
      toast.dismiss();
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof setSchema>) => {
    console.log(values);
    execute(values);
  };

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-8 h-8 p-0">
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] ">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Edit Set</CardTitle>
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
                    name="setNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Set Number</FormLabel>
                        <FormControl>
                          <Input placeholder="set number" {...field} />
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
                          <Input placeholder="Weight" {...field} />
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
    </main>
  );
};
export default EditSet;
