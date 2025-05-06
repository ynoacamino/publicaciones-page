import TabPub from '@/components/Publicaciones/TabPub';
import api from '@/lib/api';

export default async function Publicaciones() {
  const data = await api.getFullPublicacionesWithSecciones();

  return (
    <div className="bg-background w-full flex flex-col justify-center items-center py-20 gap-16">
      <div className="flex w-full flex-col">
        <TabPub sections={data} />
      </div>
    </div>
  );
}
