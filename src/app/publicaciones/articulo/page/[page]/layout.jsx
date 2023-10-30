import PaginationClient from '@/app/components/Publicaciones/PaginationClient';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';

const getData = async () => {
  dbConnect();
  const pages = await Article.countDocuments({ seccion: new RegExp('articulo', 'i') });
  return Math.ceil(pages / 6);
};

export default async function PageLayout({ children, params }) {
  const data = await getData();
  return (
    <div className="bg-gray-200 pb-10">
      {children}
      <PaginationClient pages={data} params={params} />
    </div>
  );
}
