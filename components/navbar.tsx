"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (status === "authenticated") {
    return (
      <header className="border-b shadow-lg p-3">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
            <Link href="/">Items Find</Link>
          </h1>
          <div>
            <Button
              onClick={async () => await signOut()}
              variant={"destructive"}
              type="button"
            >
              <span>
                <LogOut />
              </span>
              <span className="text-lg font-medium">Logout</span>
            </Button>
          </div>
        </nav>
      </header>
    );
  }
  return (
    <header className="border-b shadow-lg p-3">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
          <Link href="/">Items Find</Link>
        </h1>
        <Link href="/auth/login">
          <Button type="button">
            <span>
              <UserIcon />
            </span>
            <span>Login / Sign Up</span>
          </Button>
        </Link>
      </nav>
    </header>
  );
}
