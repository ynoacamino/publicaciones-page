import Image from 'next/image';

export const metadata = {
  title: 'Sobre nosotros',
};

export default function SobreNosotros() {
  return (
    <div className="w-full flex relative overflow-hidden justify-center min-h-[66vh]">
      <Image
        src="/bg.jpeg"
        alt="empresa"
        width={1080}
        height={1920}
        className="absolute w-full top-50 object-cover h-full brightness-50"
      />
      <div className="z-10 flex flex-col gap-4 items-center justify-start w-full mt-10 lg:w-4/6 text-white p-10 lg:m-10 lg:mt-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center justify-items-center">
          <p className="text-5xl font-semibold text-center ">
            Comprometidos con el desarrollo del derecho, en busca de la especialización
          </p>
          <Image
            src="/bg.jpeg"
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
