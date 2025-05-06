import ArticleContent from '@/components/ArticleContent';
import api from '@/lib/api';

export async function generateMetadata({ params }) {
  const data = await api.getPublication(params.title);
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
  const data = await api.getPublication(params.title);
  return (
    <ArticleContent
      body={data.body}
      imgSrc={data.imgSrc}
      link={data.link}
      pdfs={data.pdfs}
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
