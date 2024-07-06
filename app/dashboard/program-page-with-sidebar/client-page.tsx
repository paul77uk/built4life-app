"use client";

import {
  Sidebar,
  useSidebar,
  Overlay,
  SidebarState,
  // Button,
} from "@rewind-ui/core";
import { useState } from "react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dumbbell, Pencil, Trash, Trash2, Weight } from "lucide-react";
import Link from "next/link";

type ProgramPageProps = {
  workoutData: {
    id: string;
    title: string | null;
    weeks: {
      id: string;
      number: number;
      days: {
        id: string;
        number: number;
      }[];
    }[];
  }[];
};

const ProgramPage = (
  { workoutData }: ProgramPageProps,
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) => {
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();

  return (
    <div className="relative flex flex-row w-full h-full min-h-[calc(100vh-115px)]">
      <Sidebar
        color="dark"
        onToggle={(state: SidebarState) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="absolute"
      >
        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            {workoutData.map((workout) => (
              <Sidebar.Nav.Section.Item
                icon={<Dumbbell size={16} />}
                label={workout.title as string}
                key={workout.id}
                href="#"
              >
                <Sidebar.Nav.Section isChild>
                  {workout.weeks.map((week) => (
                    <Sidebar.Nav.Section.Item
                      icon={<span className="w-1 h-1 rounded bg-transparent" />}
                      label={`Week ${week.number}`}
                      key={week.id}
                      href="#"
                    >
                      <Sidebar.Nav.Section isChild>
                        {week.days.map((day) => (
                          <Sidebar.Nav.Section.Item
                            className="pl-10"
                            icon={
                              <span className="w-1 h-1 rounded bg-transparent" />
                            }
                            label={`Day ${day.number}`}
                            key={day.id}
                            href={`/dashboard/program-page-with-sidebar/${day.id}`}
                          />
                        ))}
                      </Sidebar.Nav.Section>
                    </Sidebar.Nav.Section.Item>
                  ))}
                </Sidebar.Nav.Section>
              </Sidebar.Nav.Section.Item>
            ))}
          </Sidebar.Nav.Section>
        </Sidebar.Nav>
      </Sidebar>

      <main
        className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${
          expanded ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {mobile && (
          <Overlay
            blur="none"
            onClick={() => {
              sidebar.toggleMobile();
            }}
            className="md:hidden z-40"
          />
        )}

        <Button
          onClick={() => {
            sidebar.toggleMobile();
          }}
          size="sm"
          color="white"
          // icon
          className="ml-auto flex md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
            <path
              className="opacity-50"
              d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
            />
          </svg>
        </Button>

        {/* <div className="w-full h-full p-8">dashboard</div> */}
      </main>
    </div>
  );
};

export default ProgramPage;
