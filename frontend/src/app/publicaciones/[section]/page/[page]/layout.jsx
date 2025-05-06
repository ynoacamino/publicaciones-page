import PaginationClient from '@/components/Publicaciones/PaginationClient';
import api from '@/lib/api';

export const metadata = {
  title: 'Jurisprudencia',
};

export default async function PageLayout({ children, params }) {
  const totalPages = await api.getNumberOfPagesSection(params.section, 6);
  return (
    <div className="bg-background pb-10 w-full">
      {children}
      <PaginationClient pages={totalPages} params={params} />
    </div>
  );
}
