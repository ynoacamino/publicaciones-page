import TabPub from '@/app/components/Publicaciones/TabPub';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';

const getData = async (params) => {
  dbConnect();
  const articleJuris = await Article.find({ seccion: new RegExp('jurisprudencia', 'i') }).sort({ createdAt: -1 }).limit(4);
  const articleArticulo = await Article.find({ seccion: new RegExp('articulo', 'i') }).sort({ createdAt: -1 }).limit(4);

  return ({ articleArticulo, articleJuris, params });
};

export default async function Publicaciones({ searchParams }) {
  const data = JSON.parse(JSON.stringify(await getData(searchParams)));
  return (
    <div className="bg-gray-200 w-full flex flex-col justify-center items-center py-20 gap-10">
      <h1 className="font-bold text-4xl md:text-5xl">
        Publicaciones
      </h1>
      <h2 className=" md:text-xl w-9/12 text-center">
        Nuestro estudio cuenta con una basta experiencia en las siguientes
        especialidades de servicios legales:
      </h2>
      <div className="flex w-full flex-col">
        <TabPub articleJuris={data.articleJuris} articleArticulo={data.articleArticulo} />
      </div>
    </div>
  );
}
