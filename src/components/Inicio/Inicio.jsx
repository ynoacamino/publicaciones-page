import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import Carousel from '../ui/carousel';

const getArticles = async () => {
  await dbConnect();

  const articles = await Article.find({}).sort({ createdAt: -1 }).limit(5);

  return {
    articles: articles.map(({
      title, imgSrc, preview, seccion, path,
    }) => ({
      title, imgSrc, preview, seccion, path,
    })),
  };
};

export default async function Inicio() {
  const { articles } = await getArticles();

  return (
    <div className=" w-full">
      <Carousel articles={articles} />
    </div>
  );
}
