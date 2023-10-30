'use client';

import ButtonLink from '@/app/components/ButtonLink';

export default function GlobalError() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-11/12 md:w-8/12 shadow-lg rounded-md bg-white py-10 px-20 flex flex-col justify-center items-center gap-6">
        <h2 className="text-4xl font-extrabold text-red-800">Pagina no encontrada!</h2>
        <ButtonLink path="/">
          Volver al inicio
        </ButtonLink>
      </div>
    </div>
  );
}
