"use client";

import { Sidebar, useSidebar, Overlay, SidebarState } from "@rewind-ui/core";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Days, Exercises, Weeks, Workouts } from "@/lib/infer-types";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import CreateProgram from "./create-program";
import { getProgramsByUserId } from "./actions/get-programs-by-user-id";
import DeleteProgram from "./delete-program";
import EditProgram from "./edit-program";
import CreateExercise from "./create-exercise";

const ProgramSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();

  const { data: workouts } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => getProgramsByUserId(),
  });

  const [program, setProgram] = useState<Workouts>();
  const [weeks, setWeeks] = useState<Weeks>();
  const [days, setDays] = useState<Days>();
  const [exercises, setExercises] = useState<Exercises>();

  useEffect(() => {
    if (workouts) {
      setProgram(workouts[0]);
      if (workouts[0].weeks) {
        setWeeks(workouts[0].weeks[0]);
        if (workouts[0].weeks[0].days) {
          setDays(workouts[0].weeks[0].days[0]);
          if (workouts[0].weeks[0].days[0].exercises) {
            setExercises(workouts[0].weeks[0].days[0].exercises[0]);
          }
        }
      }
    }
  }, [workouts]);

  return (
    <div className="relative flex flex-row w-full h-full min-h-[calc(100vh-112px)]">
      <Sidebar
        color="dark"
        onToggle={(state: SidebarState) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="absolute bg-black"
      >
        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title className="flex items-center gap-1">
              Programs <CreateProgram />
            </Sidebar.Nav.Section.Title>
            {workouts?.map((workout: any) => (
              <Sidebar.Nav.Section.Item
                className="ml-4"
                onClick={() => {
                  setProgram(workout);
                  setWeeks(workout.weeks[0]);
                  setDays(workout.weeks[0].days[0]);
                }}
                key={workout.id}
                // icon={<span />}
                // icon={<Dumbbell />}
                label={workout.title}
                href="#"
                active={program?.id === workout.id}
              >
                <Sidebar.Nav.Section isChild className="ml-8">
                  {workout.weeks.map((week: any) => (
                    <Sidebar.Nav.Section.Item
                      key={week.id}
                      // icon={<span />}
                      label={`Week ${week.number}`}
                      href="#"
                      onClick={() => {
                        setProgram(workout);
                        setWeeks(week);
                        setDays(week.days[0]);
                      }}
                      active={weeks?.id === week.id}
                    >
                      <Sidebar.Nav.Section isChild className="ml-4">
                        {week.days.map((day: any) => (
                          <Sidebar.Nav.Section.Item
                            key={day.id}
                            // icon={
                            //   <span className="w-1 h-1 rounded bg-transparent" />
                            // }
                            label={`Day ${day.number}`}
                            href="#"
                            onClick={() => {
                              setProgram(workout);
                              setWeeks(week);
                              setDays(day);
                            }}
                            active={days?.id === day.id}
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
        className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center${"md:ml-64"}`}
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
        <header className="flex flex-row px-8 items-center  w-full shadow-sm min-h-[4rem] bg-black">
          {program && (
            <div className="flex items-center gap-3 ml-auto md:mx-auto text-primary font-bold text-xl md:text-2xl">
              {program.title}
              <div className="flex gap-1 items-center">
                <EditProgram id={program.id} title={program.title} />
                <DeleteProgram id={program.id} title={program.title} />
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              sidebar.toggleMobile();
            }}
            size="sm"
            // color="white"
            // icon
            className="ml-auto flex md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                fill="#fff"
                d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"
              />
              <path
                fill="#fff"
                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </Button>
        </header>

        <div className="w-full h-full">
          <div className="text-center">
            {exercises && <CreateExercise dayId={exercises.dayId} />}

            {days?.exercises.map((exercise: any) => {
              return (
                <div className="mb-4" key={exercise.id}>
                  <DataTable
                    columns={columns}
                    data={exercise.sets}
                    exercise={exercise}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramSidebar;
