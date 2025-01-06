import ArticleBox from '@/components/Publicaciones/ArticleBox';
import Carousel from '@/components/ui/carousel';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import { upperFirst } from '@/lib/utils';

export const revalidate = 0;

const getData = async (pageNumber, section) => {
  try {
    dbConnect();

    const articles = await Article.find({ seccion: new RegExp(section, 'i') })
      .sort({ createdAt: -1 })
      .skip((Number(pageNumber) - 1) * 6)
      .limit(6);

    console.log(articles);
    return articles;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function Jurisprudencia({ params }) {
  params.section = decodeURIComponent(params.section);
  const data = await getData(params.page, params.section);
  return (
    <>
      <Carousel articles={data} />
      <div className="w-full bg-background flex flex-col justify-center items-center py-20 gap-10 px-6">
        <h1 className="text-2xl md:text-3xl w-9/12 text-center font-bold">
          Nuestras Publicaciones de
          {' '}
          {upperFirst(params.section)}
        </h1>
        <div className="w-full max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-16 justify-around">
          {data.map((art) => (
            <ArticleBox
              key={art.title}
              date={art.date}
              author={art.author}
              title={art.title}
              imgSrc={art.imgSrc}
              id={art._id.toString()}
              seccion={art.seccion}
              path={art.path}
              pdfSrc={art.pdfSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
}
