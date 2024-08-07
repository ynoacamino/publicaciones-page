import PreviewBody from '@/components/PreviewBody';
import ArticleBox from '@/components/Publicaciones/ArticleBox';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import { upperFirst } from '@/lib/utils';

const getData = async (pageNumber, section) => {
  try {
    dbConnect();
    const articles = await Article.find({ seccion: new RegExp(section, 'i') })
      .sort({ createdAt: -1 })
      .skip((Number(pageNumber) - 1) * 6)
      .limit(6);
    return articles;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function Jurisprudencia({ params }) {
  const data = await getData(params.page, params.section);
  return (
    <>
      <PreviewBody
        title={data[0].title}
        date={data[0].date}
        author={data[0].author}
        imgSrc={data[0].imgSrc}
        preview={data[0].preview}
        seccion={data[0].seccion}
      />
      <div className="w-full bg-[#dadaff] flex flex-col justify-center items-center py-20 gap-10">
        <h1 className=" md:text-3xl w-9/12 text-center font-bold">
          Nuestras Publicaciones de
          {' '}
          {upperFirst(params.section)}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-around">
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
