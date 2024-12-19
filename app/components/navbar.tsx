import { Link } from "@remix-run/react";
import ThemeController from "./themes/theme-controller";

export default function Navbar() {
  const links = [
    {
      title: "Home",
    },
    {
      title: "How It Works",
    },
    {
      title: "Products",
    },
    {
      title: "Dashboard",
    },
    {
      title: "Contact Us",
    },
  ];
  return (
    <div className="navbar bg-base-100 border-b shadow-lg">
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm bg-secondary dark:bg-base-300 dropdown-content rounded-lg z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/">Qr ItemsFind.com</Link>
              </li>
              {Array.isArray(links) &&
                links?.map((link) => (
                  <li key={link.title}>
                    <Link to="/" className="capitalize text-sm">
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <Link to="/" className="text-xl font-medium">
            <span className="hover:text-orange-500">QR</span> ItemsFind
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {Array.isArray(links) &&
              links?.map((link) => (
                <li key={link.title}>
                  <Link to="/" className="capitalize text-sm">
                    {link.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="navbar-end flex gap-3 items-center">
          <Link to="/" className="btn rounded-md">
            Login / Sign Up
          </Link>
          <ThemeController />
        </div>
      </div>
    </div>
  );
}
