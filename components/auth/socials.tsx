"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4" gap-4>
      <Button
        variant={"outline"}
        className="flex gap-4 w-full border-secondary-foreground/50"
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <FcGoogle size={24} />
        <div>Sign in with Google</div>
      </Button>

      <Button
        variant={"outline"}
        className="flex gap-4 w-full border-secondary-foreground/50"
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <FaGithub size={24} />
        <div>Sign in with Github</div>
      </Button>
    </div>
  );
};

export default Socials;
