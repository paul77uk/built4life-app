import { db } from "@/server";
import { auth } from "@/server/auth";
import { workouts } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Home = async () => {
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
    redirect(`/programs/`);
  }
  if (workoutData.length > 0) {
    redirect(`/programs/exercise/${workoutData[0].weeks[0].days[0].id}`);
  }
};
export default Home;

// TODO: will add landing page or keep the redirect
