'use client';

import {
  Card, CardHeader, CardBody, CardFooter, Divider,
} from '@nextui-org/react';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import archivoPdf from '@/app/assets/archivo-pdf.svg';
import ShareButton from '../ui/shareButton';

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
                PDF
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </article>
  );
}
