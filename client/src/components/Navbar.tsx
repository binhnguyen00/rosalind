import React from "react";
import { useLocation } from "react-router-dom";

import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand, NavbarContent, NavbarItem,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from "@heroui/navbar";
import { BotMessageSquare, CircleUserRound } from "lucide-react";

interface NavbarProps {
  onOpenProfile?: () => void;
}

export default function Navbar({ onOpenProfile }: NavbarProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: { label: string; href: string }[] = [
    {
      label: "Home",
      href: "/",
    },
  ];

  return (
    <HeroUINavbar
      isBordered
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarBrand>
        <Link href="/" className="flex gap-2">
          <BotMessageSquare className="h-8 w-8" />
          <p className="font-bold text-inherit text-2xl"> Resume </p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem onClick={onOpenProfile} className="cursor-pointer">
          <CircleUserRound className="h-7 w-7" />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu
        motionProps={{
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 },
          transition: { duration: 0.2 },
        }}
      >
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.label} isActive={location.pathname === item.href}>
            <Link href={item.href} color="foreground">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </HeroUINavbar>
  );
}