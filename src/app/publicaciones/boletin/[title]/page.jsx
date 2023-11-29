import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';
import ArticleContent from '@/app/components/ArticleContent';

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

export async function generateMetadata({ params }) {
  // read route params
  const data = await getData(params.title);
  return {
    title: data.title,
    description: data.preview,
    openGraph: {
      images: [data.imgSrc],
    },
  };
}

export default async function Title({ params }) {
  const data = await getData(params.title);
  return (
    <ArticleContent
      body={data.body}
      imgSrc={data.imgSrc}
      link={data.link}
      pdfSrc={data.pdfSrc}
      preview={data.preview}
      seccion={data.seccion}
      title={data.title}
      titleBody={data.titleBody}
    />
  );
}
