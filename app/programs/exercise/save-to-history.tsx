"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { saveToHistory } from "../actions/save-to-history-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SaveToHistory = ({
  workoutTitle,
  exercise,
  sets,
}: {
  workoutTitle: string;
  exercise: any;
  sets: any;
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: saveToHistory,
    onSuccess: () => {
      toast.success("Workout saved to history");
      router.push("/history");
    },
  });

  return (
    <main className="my-4">
      <Button
        className="flex gap-2"
        onClick={() =>
          mutation.mutate({ workoutName: workoutTitle, exercise, sets })
        }
      >
        Save to History <Plus />
      </Button>
    </main>
  );
};
export default SaveToHistory;
