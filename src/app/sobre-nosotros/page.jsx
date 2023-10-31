import Image from 'next/image';
import bg from '@/app/assets/bg.jpg';

export default function obreNosotros() {
  return (
    <div className="w-full flex relative overflow-hidden justify-center min-h-[65vh]">
      <Image
        src={bg}
        alt="empresa"
        width={1080}
        height={1920}
        className="absolute w-full top-50 object-cover h-full brightness-50"
      />
      <div className="z-10 flex flex-col gap-4 items-center justify-start w-full mt-10 lg:w-4/6 text-white p-10 lg:m-10 lg:mt-20">
        <h1 className="text-4xl md:text-6xl font-bold">
          SOBRE
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-10">
          NOSOTROS
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center justify-items-center">
          <p className="text-2xl font-semibold">
            En Legalia, nuestra firma de abogados está comprometida con la
            excelencia jurídica. Con años de experiencia en diversas áreas
            del derecho, ofrecemos soluciones legales efectivas y personalizadas.
            Nuestro equipo de profesionales altamente calificados aborda casos con
            pasión y dedicación, asegurando representación legal de la más alta calidad.
            Desde litigios civiles hasta asesoramiento corporativo.
          </p>
          <Image
            src={bg}
            alt="empresa"
            width={500}
            height={500}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
