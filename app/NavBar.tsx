"use client";

import React from "react";
import Link from "next/link";
import { ImBug } from "react-icons/im";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Flex, Container, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Skeleton from "@/app/components/Skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const NavBar = () => {
  return (
    <nav className="h-14 px-5 border border-gray-200 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href={"/"} className="font-bold hover:scale-110 text-2xl">
              <ImBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currPath = usePathname();
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
    <ul className="flex space-x-6 ms-3">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <Link
              href={link.href}
              className={classNames({
                "nav-link": true,
                "!text-zinc-900": link.href === currPath,
              })}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={session?.user?.image!}
              alt="User"
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
