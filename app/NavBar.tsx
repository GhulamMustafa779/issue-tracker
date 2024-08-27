import React from "react";
import Link from "next/link";
import { ImBug } from "react-icons/im";

const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex items-center space-x-14 h-14 px-5 border border-gray-200">
      <Link href={"/"} className="font-bold hover:scale-110 text-2xl">
        <ImBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link, index) => {
          return (
            <li>
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors font-medium"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
