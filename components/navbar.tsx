import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  if (!session?.user) {
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
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" variant={"destructive"}>
            <span>
              <LogOut />
            </span>
            <span>Logout</span>
          </Button>
        </form>
      </nav>
    </header>
  );
}
