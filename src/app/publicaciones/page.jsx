import PreviewBody from '../components/PreviewBody';
import TabPub from '../components/Publicaciones/TabPub';
import dbConnect from '../db/dbConnect';
import Article from '../db/models/Article';

const getData = async ({ searchParams }) => {
  dbConnect();
  const articleJuris = await Article.find({ seccion: new RegExp('jurisprudencia', 'i') }).sort({ createdAt: -1 }).limit(4);
  const articleArticulo = await Article.find({ seccion: new RegExp('articulo', 'i') }).sort({ createdAt: -1 }).limit(4);

  return { articleArticulo, articleJuris, searchParams };
};

export default async function Publicaiones({ searchParams }) {
  const data = JSON.parse(JSON.stringify(await getData({ searchParams })));
  return (
    <>
      <PreviewBody
        title={data.articleJuris[0].title}
        imgSrc={data.articleJuris[0].imgSrc}
        preview={data.articleJuris[0].preview}
        seccion={data.articleJuris[0].seccion}
      />
      <TabPub articleJuris={data.articleJuris} articleArticulo={data.articleArticulo} />
    </>
  );
}
