import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const Nav = async () => {
  const session = await auth();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Built<span className="text-red-700">4</span>Life
          </span>
        </Link>
        {!session ? (
          <Button asChild>
            <Link className="flex gap-2" href="/api/auth/signin"><LogIn size={16} />Login</Link>
          </Button>
        ) : (
          <UserButton user={session?.user} expires={session?.expires} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
