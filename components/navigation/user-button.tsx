"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export const UserButton = ({ user }: Session) => {
  return (
    <div>
      <div>{user?.email}</div>
      <button onClick={() => signOut()}>signOut</button>
    </div>
  );
};
