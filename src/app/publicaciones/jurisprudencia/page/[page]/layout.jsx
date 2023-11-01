import PaginationClient from '@/app/components/Publicaciones/PaginationClient';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';

export const metadata = {
  title: 'Jurisprudencia',
};

const getData = async (searchParams) => {
  dbConnect();
  const pages = await Article.countDocuments({ seccion: new RegExp('jurisprudencia', 'i') });
  return { num: Math.ceil(pages / 6), searchParams };
};

export default async function PageLayout({ children, params, searchParams }) {
  const data = await getData(searchParams);
  return (
    <div className="bg-gray-200 pb-10 w-full">
      {children}
      <PaginationClient pages={data.num} params={params} />
    </div>
  );
}
