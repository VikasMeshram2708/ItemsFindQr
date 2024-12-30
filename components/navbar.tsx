"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { status, data } = useSession();

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={data?.user?.image || "https://github.com/shadcn.png"}
                  alt={String(data?.user?.name)}
                />
                <AvatarFallback>{data?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  className="cursor-pointer"
                  href={`/user/${data?.user?.id}`}
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut />
                <p onClick={() => signOut()}>Logout</p>
              </DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
