import Image from 'next/image';
import bg from '@/app/assets/bg.jpg';

export const metadata = {
  title: 'Sobre nosotros',
};

export default function obreNosotros() {
  return (
    <div className="w-full flex relative overflow-hidden justify-center min-h-[75vh]">
      <Image
        src={bg}
        alt="empresa"
        width={1080}
        height={1920}
        className="absolute w-full top-50 object-cover h-full brightness-50"
      />
      <div className="z-10 flex flex-col gap-4 items-center justify-start w-full mt-10 lg:w-4/6 text-black p-10 lg:m-10 lg:mt-20">
        <div className="flex items-center justify-center w-7/12 bg-[url('/bg.jpg')] bg-cover p-8 rounded-md">
          <p className="text-2xl font-semibold text-justify">
            Página de estudio formada por abogados comprometidos con el desarrollo del derecho,
            en busca de la especialización en litigios y servicio de excelencia en base a la
            aplicación de jurisprudencia
          </p>
        </div>
      </div>
    </div>
  );
}
