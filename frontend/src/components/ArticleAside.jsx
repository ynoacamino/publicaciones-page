import Link from 'next/link';
import { upperFirst } from '@/lib/utils';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';

const getData = async () => {
  await dbConnect();

  const articles = await Article.find().sort({ createdAt: -1 }).limit(6);

  return articles.map((article) => ({
    seccion: article.seccion,
    title: article.title,
    path: article.path,
    imgSrc: article.imgSrc,
  }));
};

export default async function ArticleAside() {
  const data = await getData();

  return (
    <aside className="w-full flex flex-col gap-16 justify-start items-start ">
      {
        data.map(({
          seccion, title, path, imgSrc,
        }) => (
          <div
            key={crypto.randomUUID()}
            className="flex gap-2"
          >
            <div
              className="flex flex-col gap-2 items-start"
            >
              <Link href={`/publicaciones/${seccion}/page/1`} className="flex flex-col items-start">
                {upperFirst(seccion)}
                <div className="w-full border-b-4 border-b-blue-800" />
              </Link>
              <Link href={`/publicaciones/${seccion.toLowerCase()}/${path}`}>
                <h2 className="font-semibold hover:underline transition-colors">
                  {title}
                </h2>
              </Link>
            </div>
            <img src={imgSrc} alt={title} className="aspect-square w-40 h-40 rounded-md" />
          </div>
        ))
      }
    </aside>
  );
}
