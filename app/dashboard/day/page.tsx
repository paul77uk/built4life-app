"use client";

import { getExerciseByDayId } from "@/server/actions/get-exercise-by-day-id";
import { useQuery } from "@tanstack/react-query";

type Exercise = {
  id: string;
  name: string;
};

const DayPage = () => {
  const { data } = useQuery<Exercise[]>({
    queryKey: ["exercises"],
  });

  return (
    <main>
      <div>
        {!data ? (
          <div>Select a day</div>
        ) : (
          <div>
            {data.map((exercise) => (
              <div key={exercise.id}>
                <h1>{exercise.name}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
export default DayPage;
