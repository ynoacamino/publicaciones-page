import PreviewBody from '../components/PreviewBody';
import TabPub from '../components/Publicaciones/TabPub';
import dbConnect from '../db/dbConnect';
import Article from '../db/models/Article';

export const metadata = {
  title: 'Publicaciones',
};

const getData = async ({ searchParams }) => {
  dbConnect();
  const articleJuris = await Article.find({ seccion: new RegExp('jurisprudencia', 'i') }).sort({ createdAt: -1 }).limit(4);
  const articleArticulo = await Article.find({ seccion: new RegExp('boletin', 'i') }).sort({ createdAt: -1 }).limit(4);

  const lastPub = new Date(articleJuris[0].createdAt) > new Date(articleArticulo[0].createdAt) ? articleJuris[0] : articleArticulo[0];
  return {
    articleArticulo, articleJuris, searchParams, lastPub,
  };
};

export default async function Publicaiones({ searchParams }) {
  const data = JSON.parse(JSON.stringify(await getData({ searchParams })));

  return (
    <>
      <PreviewBody
        title={data.lastPub.title}
        imgSrc={data.lastPub.imgSrc}
        preview={data.lastPub.preview}
        seccion={data.lastPub.seccion}
      />
      <TabPub articleJuris={data.articleJuris} articleArticulo={data.articleArticulo} />
    </>
  );
}
