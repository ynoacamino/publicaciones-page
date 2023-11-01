'use client';

import React from 'react';
import {
  Navbar, NavbarBrand,
  NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import tikTok from '@/app/assets/tik-tok.svg';
import facebook from '@/app/assets/facebook.svg';
import goldLogo from '@/app/assets/gold.svg';
import blueLogo from '@/app/assets/blue.svg';

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
          <Link href="/" className="font-bold text-inherit flex justify-normal items-center gap-4 text-2xl">
            <Image
              src={goldLogo}
              alt="empresa"
              width={70}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit flex items-center justify-center gap-4 text-2xl">
            <Image
              src={goldLogo}
              alt="empresa"
              width={70}
            />
          </Link>
        </NavbarBrand>

      </NavbarContent>

      <NavbarContent justify="end">
        <div className="hidden sm:flex gap-20 items-center">
          <div className="hidden sm:flex gap-4 items-center">
            <NavbarItem>
              <Link color="foreground" href="/sobre-nosotros" className="underlineEffect">
                Sobre nosotros
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/publicaciones" className="underlineEffect">
                Publicaciones
              </Link>
            </NavbarItem>
          </div>
          <div className="hidden sm:flex gap-4 items-center">
            <NavbarItem>
              <Link href="https://www.tiktok.com/@miguelsalinasjuridico" target="_blank" className="underlineEffect">
                <Image
                  src={tikTok}
                  alt="tik-tok"
                  width={35}
                  height={35}
                />
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="https://www.facebook.com/migu.3110567" target="_blank" className="underlineEffect">
                <Image
                  src={facebook}
                  alt="facebook"
                  width={35}
                  height={35}
                />
              </Link>
            </NavbarItem>
          </div>
        </div>
      </NavbarContent>
      <NavbarMenu className="text-2xl">
        <NavbarMenuItem>
          <Link href="/sobre-nosotros" className="underlineEffect text-xl font-semibold m-6">
            Sobre nosotros
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/publicaciones" className="underlineEffect text-xl  font-semibold m-6">
            Publicaciones
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="https://www.tiktok.com/@miguelsalinasjuridico" target="_blank" className="underlineEffect text-xl  font-semibold m-6">
            <Image
              src={tikTok}
              alt="tik-tok"
              width={50}
              height={50}
            />
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="https://www.facebook.com/migu.3110567" target="_blank" className="underlineEffect text-xl  font-semibold m-6">
            <Image
              src={facebook}
              alt="facebook"
              width={50}
              height={50}
            />
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
