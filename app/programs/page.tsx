import { db } from "@/server";
import ProgramSidebar from "./programs-sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";

const ProgramsPage = async () => {
  const session = await auth();
  if (!session) {
    return;
  }
  const user = session.user;
  const workoutData = await db.query.workouts.findMany({
    where: eq(workouts.userId, user.id),
    with: { weeks: { with: { days: true } } },
  });
  redirect(`/programs/exercise/${workoutData[0].weeks[0].days[0].id}`);
};
export default ProgramsPage;
