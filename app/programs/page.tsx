import { db } from "@/server";
import ProgramSidebar from "./programs-sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import MobileMenu from "@/components/navigation/mobile-menu";

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
 if (workoutData.length < 1) {
   return <MobileMenu />
 }
 if (workoutData.length > 0) {
   redirect(`/programs/exercise/${workoutData[0].weeks[0].days[0].id}`);
 }
 
};
export default ProgramsPage;
