'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from '@formkit/tempo';
import { Button } from '@/components/ui/button';
import archivoPdf from '@/app/assets/archivo-pdf.svg';
import ShareButton from '../ui/shareButton';
import { upperFirst } from '@/lib/utils';

export default function ArticleBox({
  imgSrc, date, title, seccion, path, pdfSrc,
}) {
  return (
    <article className='className="max-w-[400px] min-w-[150px] flex flex-col items-start gap-2'>
      <Link href={`/publicaciones/${seccion.toLowerCase()}/${path}`} className="w-full">
        <header className="flex">
          <img
            alt="logo"
            src={imgSrc}
            className="w-full rounded-lg aspect-video object-fill"
          />
        </header>
      </Link>
      <Link href={`/publicaciones/${seccion}/page/1`}>
        {upperFirst(seccion)}
        <div className="w-full border-b-4 border-b-blue-800" />
      </Link>
      <main className="flex-1">
        <Link href={`/publicaciones/${seccion.toLowerCase()}/${path}`}>
          <h2 className="text-lg md:text-xl font-semibold hover:underline transition-colors">
            {title}
          </h2>
        </Link>
      </main>
      <p className="text-sm my-2 flex items-center justify-between w-full">
        <span />
        <span>
          {format(date, 'long', 'es')}
        </span>
      </p>
      <footer className="flex gap-4 justify-end items-center w-full">
        <ShareButton path={path} seccion={seccion} />
        {pdfSrc && (
        <Link href={pdfSrc} target="_blank">
          <Button className="flex gap-3" variant="destructive">
            <Image
              src={archivoPdf}
              alt="pdf"
              width={25}
              height={25}
              className="invert"
            />
            <span className="sr-only">
              PDF
            </span>
          </Button>
        </Link>
        )}
      </footer>
    </article>
  );
}
