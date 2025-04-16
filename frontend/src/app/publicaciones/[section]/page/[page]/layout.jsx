import PaginationClient from '@/components/Publicaciones/PaginationClient';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';

export const metadata = {
  title: 'Jurisprudencia',
};

const getData = async (searchParams, section) => {
  dbConnect();
  const pages = await Article.countDocuments({ seccion: new RegExp(section, 'i') });
  return { num: Math.ceil(pages / 6), searchParams };
};

export default async function PageLayout({ children, params, searchParams }) {
  const data = await getData(searchParams, params.section);
  return (
    <div className="bg-background pb-10 w-full">
      {children}
      <PaginationClient pages={data.num} params={params} />
    </div>
  );
}
