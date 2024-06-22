import {
  BarChart,
  BookOpenText,
  Dumbbell,
  Medal,
  Settings,
} from "lucide-react";

import DashboardNav from "@/components/navigation/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      label: "Workouts",
      path: "/dashboard/workouts",
      icon: <Dumbbell size={16} />,
    },
    {
      label: "Records",
      path: "/dashboard/records",
      icon: <Medal size={16} />,
    },
    {
      label: "History",
      path: "/dashboard/history",
      icon: <BookOpenText size={16} />,
    },
    {
      label: "Charts",
      path: "/dashboard/charts",
      icon: <BarChart size={16} />,
    },

    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={16} />,
    },
  ];

  return (
    <main>
      <DashboardNav links={links} />
      <div className="w-full mx-auto max-[320px]:w-[250px] min-[321px]:w-5/6 sm:w-[600px] min-[506px]:pt-[50px] max-[505px]:pt-[100px]">
        {children}
      </div>
    </main>
  );
}
