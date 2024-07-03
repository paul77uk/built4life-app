import { db } from "@/server";
import { auth } from "@/server/auth";
import { exerciseHistory, workoutHistory } from "@/server/schema";
import { eq } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HistoryPage = async () => {
  const session = await auth();
  if (!session) {
    return;
  }
  const user = session.user;
  const workoutHistoryData = await db.query.workoutHistory.findMany({
    where: eq(workoutHistory.userId, user.id),
    with: {
      exerciseHistory: {
        with: { setHistory: true },
      },
    },
  });
  return (
    <main className="m-3">
      {workoutHistoryData.map((workout) => (
        <div key={workout.id}>
          {workout.exerciseHistory.map((exercise) => (
            <div key={exercise.id}>
              <Table className="border mb-3">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Workout</TableHead>
                    <TableHead>Exercise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-primary border-b">
                  <TableRow>
                    <TableCell>
                      {workout.created?.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{workout.workoutName}</TableCell>
                    <TableCell>{exercise.exerciseName}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHeader>
                  <TableRow>
                    <TableHead>Set</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Reps</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exercise.setHistory.map((set) => (
                    <TableRow key={set.id}>
                      <TableCell>{set.setNumber}</TableCell>
                      <TableCell>{set.weight}</TableCell>
                      <TableCell>{set.reps}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};
export default HistoryPage;
