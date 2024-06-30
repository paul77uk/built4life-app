"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useClientStore } from "@/lib/client-store";
import { getDayById } from "@/server/actions/get-current-day";
import { getWeeksByWorkoutId } from "@/server/actions/get-weeks-by-workout-id";
import { useQuery } from "@tanstack/react-query";

const DaysPage = () => {
  const { weekId } = useClientStore();
  const { setDayId } = useClientStore();

  const { data } = useQuery({
    queryKey: ["days", weekId],
    queryFn: async () => await getDayById({ weekId }),
  });

  console.log(data);

  if (!data) return null;
  return (
    <RadioGroup
      onValueChange={(value) => setDayId(value)}
      defaultChecked
      defaultValue={data[0].id}
    >
      {data.map((day) => (
        <div className="flex items-center space-x-2" key={day.id}>
          <RadioGroupItem value={day.id} id={day.id} />
          <Label htmlFor={day.id}>{day.number}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
export default DaysPage;
