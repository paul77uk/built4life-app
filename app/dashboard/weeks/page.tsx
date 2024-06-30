"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useClientStore } from "@/lib/client-store";
import { getWeeksByWorkoutId } from "@/server/actions/get-weeks-by-workout-id";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const WeeksPage = () => {
  const { workoutId } = useClientStore();
  const { setWeekId } = useClientStore();
  const { setDayId } = useClientStore();
  // const { data } = useQuery<any>({
  //   queryKey: ["weeks"],
  // });

  // const queryClient = useQueryClient();

  // queryClient.invalidateQueries({ queryKey: ["weeks", workoutId] });

  const { data } = useQuery({
    queryKey: ["weeks", workoutId],
    queryFn: async () => await getWeeksByWorkoutId({ workoutId }),
  });

  // For the days, they need to have a weekId for which week the days are from, as it's not set until we click the onValueChange, we need to set an intial weekId
  

  if (!data) return null;
  return (
    <RadioGroup
      defaultChecked
      defaultValue={data[0].id}
      // onSelect={() => setWeekId(data[0].id)}
      onValueChange={(value) => {
        setWeekId(value);
        // setDayId(data[0].days[0].id);
      }}
    >
      {data.map((week: any) => (
        <div className="flex items-center space-x-2" key={week.id}>
          <RadioGroupItem value={week.id} id={week.id} />
          <Label htmlFor={week.id}>{week.number}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
export default WeeksPage;
