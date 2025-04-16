import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.png';

export default function Header() {
  return (
    <nav className="bg-[#fefffe] border-b-2 text-black font-semibold text-4xl lg:text-5xl text-center p-5 flex justify-center">
      <div className="w-8/12 flex justify-between items-center">
        <Image
          src={logo}
          alt="logo"
          width={70}
          height={70}
        />
        <ol className="flex justify-center items-center gap-6 text-xl">
          <Link href="/sobre-nosotros">Sobre nosotros</Link>
          <Link href="/">Publicaciones</Link>
          <Link href="/">Cátedra</Link>
        </ol>
      </div>
    </nav>
  );
}
