import Image from 'next/image';
import Link from 'next/link';
import error from '@/app/assets/error.svg';

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#fefffe] border-t-2 text-black font-semibold
    text-base md:text-md lg:text-xl text-center p-1 md:p-5 flex justify-center"
    >
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 justify-center gap-8 py-10">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={error}
            alt="logo"
            width={70}
            height={70}
          />
          <p className="text-medium">
            El Estudio Pariona Abogados es una firma de abogados especializada
            en Derecho Penal que brinda servicios legales de excelencia.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold my-4">
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
        <div className="">
          <h2>CONTACTO</h2>
          <div className="text-medium">
            <p>Jr. Lampa Nro. 879, Oficinas 504 - 506, Cercado de Lima (Perú)</p>
            <p>(01) 4261037 - 915154298</p>
            <p>pariona@rpa.pe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
