import Image from 'next/image';

export default function Especialidades() {
  return (
    <div className="bg-gray-300 w-full flex flex-col justify-center items-center py-20 gap-10">
      <h1 className="font-bold text-4xl md:text-5xl">
        Especialidades
      </h1>
      <h2 className=" md:text-xl w-9/12 text-center">
        Nuestro estudio cuenta con una basta experiencia en las siguientes
        especialidades de servicios legales:
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-11/12 md:w-9/12 lg:w-6/12 justify-around">
        <div className="flex flex-col gap-4 justify-center items-center font-semibold
          text-lg py-8 px-2 rounded-md hover:bg-gray-400"
        >
          <Image
            src="https://rpa.pe/static/img/especialidades/icon-derecho-penal-empresarial.png"
            width={120}
            height={120}
            alt="Img"
            className="rounded-full bg-gray-200 border-solid border-white border-4"
          />
          <span className="text-center">Derecho penal empresarial</span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center font-semibold
          text-lg py-8 px-2 rounded-md hover:bg-gray-400"
        >
          <Image
            src="https://rpa.pe/static/img/especialidades/icon-derecho-penal-empresarial.png"
            width={120}
            height={120}
            alt="Img"
            className="rounded-full bg-gray-200 border-solid border-white border-4"
          />
          <span className="text-center">Derecho penal empresarial</span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center font-semibold
          text-lg py-8 px-2 rounded-md hover:bg-gray-400"
        >
          <Image
            src="https://rpa.pe/static/img/especialidades/icon-derecho-penal-empresarial.png"
            width={120}
            height={120}
            alt="Img"
            className="rounded-full bg-gray-200 border-solid border-white border-4"
          />
          <span className="text-center">Derecho penal empresarial</span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center font-semibold
          text-lg py-8 px-2 rounded-md hover:bg-gray-400"
        >
          <Image
            src="https://rpa.pe/static/img/especialidades/icon-derecho-penal-empresarial.png"
            width={120}
            height={120}
            alt="Img"
            className="rounded-full bg-gray-200 border-solid border-white border-4"
          />
          <span className="text-center">Derecho penal empresarial</span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center font-semibold
          text-lg py-8 px-2 rounded-md hover:bg-gray-400"
        >
          <Image
            src="https://rpa.pe/static/img/especialidades/icon-derecho-penal-empresarial.png"
            width={120}
            height={120}
            alt="Img"
            className="rounded-full bg-gray-200 border-solid border-white border-4"
          />
          <span className="text-center">Derecho penal empresarial</span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center font-semibold
          text-lg py-8 px-2 rounded-md hover:bg-gray-400"
        >
          <Image
            src="https://rpa.pe/static/img/especialidades/icon-derecho-penal-empresarial.png"
            width={120}
            height={120}
            alt="Img"
            className="rounded-full bg-gray-200 border-solid border-white border-4"
          />
          <span className="text-center">Derecho penal empresarial</span>
        </div>

      </div>
    </div>
  );
}
