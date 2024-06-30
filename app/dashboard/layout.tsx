import {
  BarChart,
  BookOpenText,
  Dumbbell,
  Medal,
  Settings,
} from "lucide-react";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      label: "Programs",
      path: "/dashboard/programs",
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
      {/* <DashboardNav links={links} /> */}
      <div className="">{children}</div>
    </main>
  );
}
