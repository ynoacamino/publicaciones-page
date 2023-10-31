import Image from 'next/image';
import PreviewBody from '@/app/components/PreviewBody';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';
import logo from '@/app/assets/logo.svg';

const getData = async (path) => {
  await dbConnect();
  let article;
  try {
    article = await Article.findOne({ path });
  } catch (err) {
    console.error(err.message);
  }

  return article;
};
// mejorar
export default async function Title({ params }) {
  const data = await getData(params.title);
  return (
    <div className="w-full">
      <PreviewBody
        imgSrc={data.imgSrc}
        title={data.title}
        seccion={data.seccion}
        preview={data.preview}
      />
      <div className="w-full flex justify-center items-center">
        <div className="w-11/12 xl:w-7/12 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-8 py-20 items-start">
          <article className="col-span-1 md:col-span-3 p-8 rounded-md bg-gray-200 flex flex-col gap-6 text-lg">
            <h2 className="text-2xl font-semibold">
              {data.titleBody || '¿CUÁLES SON LOS ALCANCES DE LA SOSPECHA INICIAL SIMPLE EN LA MOTIVACIÓN DE LA DISPOSICIÓN DE LA FISCALÍA SUPERIOR? [APELACIÓN N.º 66-2023/LA LIBERTAD]'}
            </h2>
            <p>
              {data.body.map((p) => (
                <p key={p} className="my-5">
                  {p}
                </p>
              ))}
            </p>
            <p className="flex flex-col gap-2">
              <span>
                Para revisar la sentencia completa y otras
                jurisprudencias únete a nuestra COMUNIDAD:
              </span>
              <span>- Telegram: Canal de la Comunidad Pariona Abogados</span>
              <span>- WhatsApp: Comunidad Pariona Abogados</span>
            </p>
          </article>
          <div className="w-full rounded-md bg-gray-200  sticky top-36 md:col-span-1">
            <div className="p-8 flex flex-col justify-center items-center">
              <Image
                src={logo}
                alt="logo"
                className="rounded-full bg-red-600 p-2 m-3"
                width={100}
                height={100}
              />
              <span className="text-2xl font-bold text-center">
                Pariona abogados
              </span>
              <span>
                pariona@rpa.pe
              </span>
            </div>
            <div className="bg-red-600 rounded-b-md px-8 py-4 flex justify-center items-center text-white font-bold">
              Iconos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
