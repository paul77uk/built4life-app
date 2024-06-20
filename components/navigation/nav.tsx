import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, Menu } from "lucide-react";

const Nav = async () => {
  const session = await auth();

  return (
    <main className="mb-[80px] ">
      <nav className="fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600 z-50 dark:bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Built<span className="text-primary">4</span>Life
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
