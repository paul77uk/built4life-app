import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, Menu } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { Rubik_Dirt } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Rubik_Dirt({ weight: "400", preload: false });

const Nav = async () => {
  const session = await auth();

  return (
    <main className=" w-full ">
      <nav className=" dark:bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* <MobileMenu /> */}
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
      </nav>
    </main>
  );
};

export default Nav;
