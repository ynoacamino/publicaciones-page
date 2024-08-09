import Image from 'next/image';
import Link from 'next/link';
import goldLogo from '@/app/assets/gold.svg';

const paths = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Sobre nosotros',
    href: '/about',
  },
  {
    name: 'Ofertas laborales',
    href: 'https://app.servir.gob.pe/DifusionOfertasExterno/faces/consultas/ofertas_laborales.xhtml',
  },
  {
    name: 'Diccionario',
    href: '/diccionario',
  },
  {
    name: 'Publicaciones',
    href: '/publications',
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col gap-4 items-center justify-start py-16 px-6 border-t-2 border-t-zinc-500/30"
    >
      <div className="text-3xl uppercase font-bold text-center w-full max-w-lg">
        EL DERECHO SE TRANSFORMA
        DÍA A DÍA, PREPAREMONOS.
      </div>
      <Image
        src={goldLogo}
        alt="logo"
        width={120}
        height={120}
        className="m-2"
      />
      <nav className="flex flex-col md:flex-row items-center justify-center w-full max-w-xl gap-y-4 gap-x-10 text-lg">
        {
          paths.map((p) => (
            <Link key={p.name} href={p.href} className="hover:underline">
              {p.name}
            </Link>
          ))
        }
      </nav>
    </footer>
  );
}
