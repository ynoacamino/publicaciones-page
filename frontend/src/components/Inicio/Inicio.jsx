import Carousel from '../ui/carousel';
import api from '@/lib/api';

export default async function Inicio() {
  const articles = await api.getLastPublicaciones(5);

  return (
    <div className=" w-full">
      <Carousel articles={articles} />
    </div>
  );
}
