'use client';

import React from 'react';
import {
  Navbar, NavbarBrand,
  NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import error from '@/app/assets/error.svg';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit flex justify-normal items-center gap-4">
              <Image
                src={error}
                alt="logo"
                width={50}
                height={50}
              />
              NOMBRE
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit flex items-center justify-center gap-4">
              <Image
                src={error}
                alt="logo"
                width={50}
                height={50}
              />
              NOMBRE
            </p>
          </Link>
        </NavbarBrand>

      </NavbarContent>

      <NavbarContent justify="end">
        <div className="hidden sm:flex gap-4">
          <NavbarItem>
            <Link color="foreground" href="/" className="underlineEffect">
              Sobre nosotros
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/publicaciones" className="underlineEffect">
              Publicaciones
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarMenu className="text-2xl">
        <NavbarMenuItem>
          <Link href="/" className="underlineEffect text-xl font-semibold m-6">
            Sobre nosotros
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/publicaciones" className="underlineEffect text-xl  font-semibold m-6">
            Publicaciones
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
