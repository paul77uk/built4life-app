import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./settings-card";

const Settings = async () => {
  const session = await auth();

  if (!session) redirect("/");
  if (session) return <SettingsCard session={session} />;
};
export default Settings;
