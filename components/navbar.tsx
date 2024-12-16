import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <header className="border-b shadow-lg p-3">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium">
          <Link href="/">Items Find</Link>
        </h1>
        <div className="flex gap-2">
          <Button type="button">Login / Sign Up</Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
