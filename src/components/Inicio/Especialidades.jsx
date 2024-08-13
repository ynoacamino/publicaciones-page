import Image from 'next/image';
import Link from 'next/link';
import especialidad1 from '@/app/assets/especialidad1.png';
import especialidad2 from '@/app/assets/especialidad2.png';
import especialidad3 from '@/app/assets/especialidad3.png';
import especialidad4 from '@/app/assets/especialidad4.png';
import especialidad5 from '@/app/assets/especialidad5.png';
import especialidad6 from '@/app/assets/especialidad6.png';
import { cn } from '@/lib/utils';

const data = [
  {
    link: 'https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682692',
    img: especialidad1,
    name: 'Código Penal',
  },
  {
    link: 'https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682695',
    img: especialidad2,
    name: 'Código Procesal Penal',
  },
  {
    link: 'https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682684',
    img: especialidad3,
    name: 'Código Civil',
  },
  {
    link: 'https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682700',
    img: especialidad4,
    name: 'Código Penal Militar',
  },
  {
    link: 'https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H1288461',
    img: especialidad5,
    name: 'Código Procesal Constitucional',
  },
  {
    link: 'https://spij.minjus.gob.pe/spij-ext-web/#/detallenorma/H682678',
    img: especialidad6,
    name: 'Constitución Política del Perú',
  },
];

export default function Especialidades() {
  return (
    <section className="bg-gray-300 w-full flex flex-col justify-center items-center py-20 gap-10">
      <h1 className=" md:text-3xl w-9/12 text-center uppercase text-xl font-bold">
        Legislación Actualizada
      </h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-8 w-11/12 md:w-9/12 lg:w-6/12 justify-around">
        {
          data.map((d) => (
            <li key={d.name}>
              <Link
                href={d.link}
                target="_blank"
                className="flex flex-col gap-4 justify-center items-center font-semibold
                  text-lg py-8 px-2 rounded-md hover:bg-gray-400/40"
              >
                <div className="rounded-full bg-gray-200 border-solid border-white border-4 flex
                  justify-center items-center w-32 h-32"
                >
                  <Image
                    src={d.img}
                    width={80}
                    height={80}
                    alt="Img"
                    className={cn('m-4', { 'pl-2': d.name === 'Código Civil' })}
                  />
                </div>
                <span className="text-center">{d.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
}
