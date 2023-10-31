import Image from 'next/image';
import Link from 'next/link';
import { Divider } from '@nextui-org/react';
import logo from '@/app/assets/logo.svg';

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#fefffe] border-t-2 text-black font-semibold
    text-base md:text-md lg:text-xl text-center p-1 md:p-5 flex justify-center"
    >
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-8 py-10">
        <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={120}
            className="m-2"
          />
          <p className="md:text-lg">
            El Derecho se transforma dia a dia, preparemonos
          </p>
        </div>
        <Divider className="md:hidden" />
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-start">
            <h2 className="md:text-lg font-semibold my-4">
              ACCESO RAPIDO
            </h2>
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
        </div>
        <Divider className="md:hidden" />
        <div className="flex items-center justify-center flex-col">
          <h2>CONTACTO</h2>
          <div className="text-sm md:text-lg">
            <p>Jr. Lampa Nro. 879, Oficinas 504 - 506, Cercado de Lima (Perú)</p>
            <p>(01) 4261037 - 915154298</p>
            <p>pariona@rpa.pe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
