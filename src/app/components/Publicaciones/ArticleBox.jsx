'use client';

import {
  Card, CardHeader, CardBody, CardFooter, Divider,
} from '@nextui-org/react';
import Link from 'next/link';

export default function ArticleBox({
  imgSrc, date, title, author, id, seccion, path,
}) {
  return (
    <article>
      <Card className="max-w-[400px] min-w-[150px]">
        <Link href={`/publicaciones/${seccion.toLowerCase()}/${id}`}>
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
        <CardFooter>
          <Link
            href="https://github.com/nextui-org/nextui"
          >
            Compartir
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
}
