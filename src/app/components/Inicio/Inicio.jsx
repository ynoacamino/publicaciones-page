import Image from 'next/image';
import bg from '@/app/assets/bg.jpg';
import goldLogo from '@/app/assets/gold.svg';

export default function Inicio() {
  return (
    <div className="w-full flex relative overflow-hidden justify-center h-[55vh] sm:h-[50vh]">
      <Image
        src={bg}
        alt="empresa"
        width={1080}
        height={1920}
        className="absolute w-full top-50 object-cover h-full brightness-50"
      />
      <Image
        src={goldLogo}
        alt="empresa"
        width={200}
        height={200}
        className="absolute lg:left-12 top-12 w-32 h-32 lg:w-[200px] lg:h-[200px] rounded-full backdrop-blur-sm"
      />
      <h1 className="z-10 flex flex-col gap-4 items-center justify-center w-full mt-28 lg:w-4/6 text-white p-10 lg:m-10 lg:mt-40">
        <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Defensa Legal
        </span>
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-500 text-center">
          de Excelencia
        </span>
      </h1>
    </div>
  );
}
