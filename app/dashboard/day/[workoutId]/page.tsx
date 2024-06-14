import { Button } from "@/components/ui/button";
import { db } from "@/server";
import { weeks } from "@/server/schema";
import { eq } from "drizzle-orm";

import Link from "next/link";
import DayBtn from "../day-btn";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWeeksByWorkoutId } from "@/server/actions/get-weeks-by-workout-id";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { use } from "react";
import ExercisePage from "../../exercises/[dayId]/page";

// type Params = {
//   workoutId: string;
// };

const WorkoutPage = () => {
  // const params = useParams();
  // const workoutId = params.workoutId as string;
  // console.log("workoutId", workoutId);

  // const { setDayId } = useClientStore();

  // const { data } = useQuery({
  //   queryKey: ["weeks"],
  //   queryFn: () => getWeeksByWorkoutId({ workoutId }),
  // });

  // console.log("weeksData", data);

  // const weeksData = async () => {

  //   await db.query.weeks.findMany({
  //     with: {
  //       days: true,
  //     },
  //     where: eq(weeks.workoutId, workoutId as string),
  //   });
  // };

  // console.log("weeksData", weeksData);
  return <ExercisePage />;
};
export default WorkoutPage;
