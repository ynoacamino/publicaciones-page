import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import ArticleContent from '@/components/ArticleContent';

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
  const data = await getData(params.title);
  return {
    title: data.title,
    description: data.preview,
    openGraph: {
      images: [data.imgSrc],
      description: data.preview,
      title: data.title,
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
      videoUrl={data?.videoUrl}
      autorFacebook={data?.authorFacebook}
      autorImg={data?.authorImg}
      autorName={data?.authorName}
      autorPosition={data?.authorPosition}
      path={data?.path}
    />
  );
}
