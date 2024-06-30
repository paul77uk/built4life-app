import { auth } from "@/server/auth";
import ClientPage from "./client-page";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { workouts } from "@/server/schema";
import ProgramPage from "./client-page";
import ServerPage from "./server-page";

const Page = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // if (!workouts) throw new Error("No workouts found");
  return (
    <main className="flex">
      {/* <ServerPage /> */}
      {/* {children} */}
    </main>
  );
};
export default Page;
