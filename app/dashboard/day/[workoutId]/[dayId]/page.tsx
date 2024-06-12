import { db } from "@/server";
import { exercises } from "@/server/schema";
import { eq } from "drizzle-orm";

type DayPageParams = {
  params: {
    dayId: string;
  };
};

const DayPage = async ({ params }: DayPageParams) => {
  const { dayId } = params;
  const exerciseData = await db.query.exercises.findMany({
    where: eq(exercises.dayId, dayId),
  });
  return <main>
    {exerciseData.map((exercise) => (
      <div key={exercise.id}>
        <h1>{exercise.name}</h1>
        
      </div>
    ))}
  </main>
};
export default DayPage;
