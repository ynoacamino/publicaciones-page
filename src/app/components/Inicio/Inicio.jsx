import Image from 'next/image';
import bg from '@/app/assets/bg.jpg';
import goldLogo from '@/app/assets/gold.svg';
import RedBox from './RedBox';

export default function Inicio() {
  return (
    <div className="w-full flex relative overflow-hidden justify-center h-[55vh] sm:h-[50vh]">
      <Image
        src={bg}
        alt="empresa"
        width={1080}
        height={1920}
        className="absolute w-full top-50 object-cover h-full"
      />
      <Image
        src={goldLogo}
        alt="empresa"
        width={100}
        height={100}
        className="absolute lg:left-12 top-12 w-32 h-32 lg:w-[100px] lg:h-[100px] rounded-full backdrop-blur-sm"
      />
      <RedBox />
    </div>
  );
}
