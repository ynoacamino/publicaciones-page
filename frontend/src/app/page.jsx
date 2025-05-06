import Inicio from '@/components/Inicio/Inicio';
import Especialidades from '../components/Inicio/Especialidades';
import RedBox from '../components/Inicio/RedBox';
import Publicaciones from '../components/Inicio/Publicaciones';
import About from '@/components/Inicio/About';

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Inicio />
      <RedBox />
      <About />
      <Publicaciones />
      <Especialidades />
    </>
  );
}
