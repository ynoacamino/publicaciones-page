import Image from 'next/image';
import Link from 'next/link';
import facebook from '@/app/assets/facebook.svg';
import logo from '@/app/assets/gold.svg';

export default function ArticleAside({
  autorName, autorImg, autorPosition, autorFacebook,
}) {
  return (
    <aside className="w-full rounded-md bg-gray-200  xl:sticky xl:top-36 md:col-span-1 min-w-min">
      <div className="p-8 flex flex-col justify-center items-center">
        <Image
          src={autorImg || logo}
          alt="logo"
          className="m-3"
          width={100}
          height={100}
        />
        <h3 className="text-2xl font-bold text-center">
          {autorName || 'Miguel Salinas Vargas'}
        </h3>
        <span>
          {autorPosition || 'Abogado'}
        </span>
      </div>
      <div className="bg-[#191970] rounded-b-md px-8 py-4 flex justify-center items-center text-white font-bold">
        <Link href={autorFacebook || 'https://www.facebook.com/migu.3110567'} target="_blank">
          <Image
            src={facebook}
            alt="facebook"
            width={35}
            height={35}
            className="invert"
          />
        </Link>
      </div>
    </aside>
  );
}
