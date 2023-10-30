import Inicio from '@/app/components/Inicio/Inicio';
import Especialidades from './components/Inicio/Especialidades';
import RedBox from './components/Inicio/RedBox';
import Publicaciones from './components/Inicio/Publicaciones';

export default function Home({ searchParams }) {
  return (
    <>
      <Inicio />
      <RedBox />
      <Especialidades />
      <Publicaciones searchParams={searchParams} />
    </>
  );
}
