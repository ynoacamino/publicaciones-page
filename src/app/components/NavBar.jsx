'use client';

import Image from 'next/image';
import tikTok from '@/app/assets/tikTok.png';
import facebook from '@/app/assets/facebook.png';
import ButtonNavBar from './ButtonNavBar';
import NavBarMobile from './NavBarMobile';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <header className="flex text-white w-full justify-between px-4 py-5 sticky top-0 bg-one z-20 bg-[#191970] backdrop-blur-lg h-[74px]">
      <div className="" />
      <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-start px-4 md:px-10 2xl:justify-center items-center pr-16">
        <SearchBar />
      </div>
      <nav id="navBarH" className="lg:flex items-center justify-center gap-4 text-lg hidden">
        <ButtonNavBar href="/sobre-nosotros">Sobre nosotros</ButtonNavBar>
        <ButtonNavBar href="/publicaciones">Publicaciones</ButtonNavBar>
        <ButtonNavBar href="/sobre-nosotros" target>
          <Image
            src={tikTok}
            alt="https://www.tiktok.com/@miguelsalinasjuridico"
            width={34}
            height={34}
          />
        </ButtonNavBar>
        <ButtonNavBar href="https://www.facebook.com/migu.3110567" target>
          <Image
            src={facebook}
            alt="facebook"
            width={34}
            height={34}
          />
        </ButtonNavBar>
      </nav>
      <NavBarMobile />
    </header>
  );
}
