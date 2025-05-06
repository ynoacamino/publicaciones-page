import TabPub from '../../components/Publicaciones/TabPub';
import Carousel from '@/components/ui/carousel';
import api from '@/lib/api';

export const revalidate = 0;

export const metadata = {
  title: 'Publicaciones',
};

export default async function Publicaiones() {
  const lastPubs = await api.getLastPublicaciones(6);
  const populedSections = await api.getFullPublicacionesWithSecciones();

  return (
    <>
      <Carousel
        articles={lastPubs}
      />
      <div className="w-full flex flex-col items-center my-20 gap-10">
        <h1 className="uppercase text-4xl font-bold text-center">Publicaciones</h1>
        <TabPub sections={populedSections} />
      </div>
    </>
  );
}
