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

  articles.push({
    title: 'Ofertas laborales',
    imgSrc: 'https://res.cloudinary.com/dazt6g3o1/image/upload/v1723219602/iifnfpura4ose8sobpw1.jpg',
    preview: 'Encuentra las mejores ofertas laborales en nuestra seccion de ofertas laborales',
    seccion: 'Ofertas laborales',
    path: '/',
  });

  return (
    <div className=" w-full">
      <Carousel articles={articles} />
    </div>
  );
}
