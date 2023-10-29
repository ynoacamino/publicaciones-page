import PreviewBody from '../components/PreviewBody';
import TabPub from '../components/Publicaciones/TabPub';
import dbConnect from '../db/dbConnect';
import Article from '../db/models/Article';

const getData = async () => {
  dbConnect();
  const articleJuris = await Article.find({ seccion: new RegExp('jurisprudencia', 'i') }).limit(4);
  const articleArticulo = await Article.find({ seccion: new RegExp('articulo', 'i') }).limit(4);

  return { articleArticulo, articleJuris };
};

export default async function Publicaiones() {
  const data = await JSON.parse(JSON.stringify(getData()));
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
