import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b shadow-lg p-3">
      <nav className="container mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
          <Link href="/">Items Find</Link>
        </h1>
      </nav>
    </header>
  );
}
