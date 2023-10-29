import Image from 'next/image';
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
          <p className="text-sm">
            El Estudio Pariona Abogados es una firma de abogados especializada
            en Derecho Penal que brinda servicios legales de excelencia.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-start">
            <h2>
              ACCESO RAPIDO
            </h2>
            <ol className="text-sm flex flex-col items-start ml-4">
              <li>
                La firma
              </li>
              <li>
                Especialidades
              </li>
              <li>
                Equipo
              </li>
              <li>
                Publicaciones
              </li>
              <li>
                Cátedra
              </li>
            </ol>
          </div>
        </div>
        <div className="">
          <h2>CONTACTO</h2>
          <div className="text-sm">
            <p>Jr. Lampa Nro. 879, Oficinas 504 - 506, Cercado de Lima (Perú)</p>
            <p>(01) 4261037 - 915154298</p>
            <p>pariona@rpa.pe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
