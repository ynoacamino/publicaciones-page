import Image from 'next/image';
import Link from 'next/link';
import { Divider } from '@nextui-org/react';
import goldLogo from '@/app/assets/gold.svg';

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#fefffe] border-t-2 text-black font-semibold
      text-base md:text-md lg:text-xl text-center p-1 md:p-5 flex justify-center"
    >
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8 py-10">
        <aside className="flex justify-center items-center gap-2 flex-col md:flex-row">
          <Image
            src={goldLogo}
            alt="logo"
            width={120}
            height={120}
            className="m-2"
          />
          <header className="md:text-2xl">
            El Derecho se transforma día a día, preparémonos.
          </header>
        </aside>
        <Divider className="md:hidden" />
        <aside className="flex justify-center items-center">
          <div className="flex flex-col items-start">
            <header className="md:text-lg font-semibold my-4">
              ACCESO RAPIDO
            </header>
            <ol className="text-medium flex flex-col items-start ml-4 gap-3">
              <li>
                <Link href="/" className="underlineEffect">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="underlineEffect">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/publicaciones" className="underlineEffect">
                  Publicaciones
                </Link>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </footer>
  );
}
