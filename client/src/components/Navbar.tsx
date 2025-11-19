import React from "react";
import { useLocation } from "react-router-dom";
import { BotMessageSquare, CircleUserRound, ChevronsRight } from "lucide-react";

import {
  Navbar as HeroUINavbar,
  NavbarBrand, NavbarContent, NavbarItem,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
  Link, Avatar,
  Drawer, DrawerBody, DrawerContent, DrawerHeader,
  Button, ScrollShadow, Tooltip, useDisclosure,
} from "@heroui/react";

import { Profile } from "@pages";
import { PocketBaseContext } from "@components";

export default function Navbar() {
  const location = useLocation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { avatar } = React.useContext(PocketBaseContext);

  const menuItems: { label: string; href: string }[] = [
    {
      label: "Home",
      href: "/",
    },
  ];

  return (
    <>
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
          <NavbarItem onClick={onOpen} className="cursor-pointer">
            {avatar.length > 0 ? (
              <Avatar src={avatar} />
            ) : (
              <CircleUserRound className="h-7 w-7" />
            )}
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
      <Drawer
        size="lg" isDismissable={false} hideCloseButton
        isOpen={isOpen} onOpenChange={onOpenChange}
        classNames={{
          header: "border-b border-divider p-2 flex items-center",
          body: "p-4"
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <Tooltip content="Dismiss" placement="left">
              <Button isIconOnly size="lg" variant="light" onPress={onClose}>
                <ChevronsRight size={18} />
              </Button>
            </Tooltip>
            <span className="text-lg font-semibold"> Profile </span>
          </DrawerHeader>
          <DrawerBody>
            <ScrollShadow orientation="vertical" className="h-full">
              <Profile />
            </ScrollShadow>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}