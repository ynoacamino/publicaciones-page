'use client';

import {
  Card, CardHeader, CardBody, CardFooter, Divider,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import archivoPdf from '@/app/assets/archivo-pdf.svg';

export default function ArticleBox({
  imgSrc, date, title, author, seccion, path, pdfSrc,
}) {
  return (
    <article>
      <Card className="max-w-[400px] min-w-[150px]">
        <Link href={`/publicaciones/${seccion.toLowerCase()}/${path}`}>
          <CardHeader className="flex">
            <img
              alt="logo"
              src={imgSrc}
              className="w-full rounded-lg aspect-video object-fill"
            />
          </CardHeader>
        </Link>
        <Divider />
        <CardBody>
          <p className="text-gray-700 text-sm mb-4">{date}</p>
          <Link href={`/publicaciones/${seccion.toLowerCase()}/${path}`}>
            <h2 className="text-xl font-semibold hover:text-red-800 transition-colors">
              {title}
            </h2>
          </Link>
          <p className=" text-sm mt-4">
            Por:
            {' '}
            {author}
          </p>
        </CardBody>
        <Divider />
        <CardFooter className="flex gap-4 justify-end items-center">
          <Link
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=https://miguelsalinasjuridico.com/publicaciones/${seccion.toLowerCase()}/${path}/&src=sdkpreparse`}
          >
            <button type="button" class="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-[#191970] text-primary-foreground data-[hover=true]:opacity-hover">
              Compartir
            </button>
          </Link>
          {pdfSrc && (
            <Link href={pdfSrc} target="_blank">
              <Button className="flex gap-3" color="danger">
                <Image
                  src={archivoPdf}
                  alt="pdf"
                  width={25}
                  height={25}
                  className="invert"
                />
                PDF
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
