'use client';

import React from "react";
import Link from "next/link";
import { ImBug } from "react-icons/im";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
    const currPath = usePathname();
    const {status, data: session} = useSession();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
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
            <li key={index}>
              <Link
                href={link.href}
                className={`${link.href === currPath? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors font-medium`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Box>
        {
          status === 'authenticated' && <Link href='/api/auth/signout'>Log out</Link>
        }
        {
          status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>
        }
      </Box>
    </nav>
  );
};

export default NavBar;
