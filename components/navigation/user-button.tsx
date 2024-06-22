"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { IoBarbellOutline } from "react-icons/io5";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";
import { GoPersonFill } from "react-icons/go";
import { IoPerson } from "react-icons/io5";

export const UserButton = ({ user }: Session) => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const setSwitchState = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <IoPerson size={22} />
          {/* <GoPersonFill size={22} /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col gap-1 rounded-lg items-center bg-primary ">
            {user.image && (
              <Image
                src={user.image}
                alt="User Image"
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <p className="font-bold text-xs text-white">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground text-white">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="group py-2 font-medium cursor-pointer"
            onClick={() => router.push("/dashboard/workouts")}
          >
            <IoBarbellOutline
              size={20}
              className="mr-2 group-hover:-translate-y-1 transition-all duration-300 ease-in-out"
            />
            Workouts
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group py-2 font-medium cursor-pointer ease-in-out"
            onClick={() => router.push("/dashboard/settings")}
          >
            <Settings
              size={16}
              className="mr-2 group-hover:rotate-180 transition-all duration-300 ease-in-out"
            />
            Settings
          </DropdownMenuItem>
          {theme && (
            <DropdownMenuItem className="py-2 font-medium cursor-pointer ease-in-out">
              <div
                className="flex items-center group"
                onClick={(e) => e.stopPropagation()}
              >
                {theme === "light" ? (
                  <Sun
                    size={16}
                    className="mr-2 group-hover:text-yellow-600 group-hover:rotate-180 dark:-rotate-90 transition-all duration-500 ease-in-out"
                  />
                ) : (
                  <Moon size={16} className="mr-2 group-hover:text-blue-400" />
                )}
                <p className="dark:text-blue-400 text-secondary-foreground/75   text-yellow-600">
                  {theme[0].toUpperCase() + theme.slice(1)} Mode
                </p>
                <Switch
                  className="scale-75 ml-4"
                  checked={theme === "dark"}
                  onCheckedChange={setSwitchState}
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => signOut()}
            className="py-2 group focus:bg-primary font-medium cursor-pointer focus:text-white"
          >
            <LogOut
              size={16}
              className="mr-2 dark:group-hover:scale-75 dark:transition-all dark:duration-300 dark:ease-in-out"
            />{" "}
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
