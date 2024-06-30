import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

import { Rubik_Dirt } from "next/font/google";
import { cn } from "@/lib/utils";

import { auth } from "@/server/auth";

const font = Rubik_Dirt({ weight: "400", preload: false });

const Nav = async () => {
  const session = await auth();

  return (
    <div className=" w-full ">
      <nav className=" dark:bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span
                className={cn(
                  font.className,
                  "self-center text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap dark:text-white"
                )}
              >
                BUILT<span className="text-primary">4</span>LIFE
              </span>
            </Link>
          </div>

          <div className="text-white">
            {!session ? (
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={16} />
                  Login
                </Link>
              </Button>
            ) : (
              <UserButton user={session?.user} expires={session?.expires} />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
