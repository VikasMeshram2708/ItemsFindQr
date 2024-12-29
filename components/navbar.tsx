"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <header className="border-b shadow-lg">
        <nav className="container mx-auto flex items-center justify-between p-3">
          <Link className="chead font-bold" href="/">
            Qr-ItemsFind
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/au/lo"
          >
            Login / Sign Up
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="border-b shadow-lg">
      <nav className="flex container mx-auto items-center justify-between p-3">
        <Link className="chead font-bold" href="/">
          Qr-ItemsFind
        </Link>

        {status === "loading" ? (
          <span className="text-sm">processing...</span>
        ) : (
          <Button
            onClick={() => signOut()}
            type="submit"
            variant={"destructive"}
          >
            <span>
              <LogOut />
            </span>
            <span>Logout</span>
          </Button>
        )}
      </nav>
    </header>
  );
}
