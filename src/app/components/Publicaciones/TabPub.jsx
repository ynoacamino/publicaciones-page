'use client';

import {
  Tabs, Tab, Button,
} from '@nextui-org/react';
import Link from 'next/link';
import ArticleBox from '@/app/components/Publicaciones/ArticleBox';

export default function PublicationsTabs({ articleArticulo, articleJuris }) {
  return (
    <div className="w-full bg-[#dadaff] flex justify-center items-center py-10">
      <div className="w-11/12 md:w-8/12 flex flex-col justify-center items-center">
        <Tabs aria-label="Options" size="lg">
          <Tab title="Jurisprudencia">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-around">
              {articleJuris.map((art) => (
                <div key={art._id.toString()}>
                  <ArticleBox
                    key={art.title}
                    date={art.date}
                    author={art.author}
                    title={art.title}
                    imgSrc={art.imgSrc}
                    id={art._id.toString()}
                    seccion={art.seccion}
                    path={art.path}
                    pdfSrc={art.pdfSrc}
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center items-center my-10">
              <Link href="/publicaciones/jurisprudencia/page/1">
                <Button color="success">
                  Ver mas
                </Button>
              </Link>
            </div>
          </Tab>
          <Tab title="Boletines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-around">
              {articleArticulo.map((art) => (
                <div key={art._id.toString()}>
                  <ArticleBox
                    key={art.title}
                    date={art.date}
                    author={art.author}
                    title={art.title}
                    imgSrc={art.imgSrc}
                    id={art._id.toString()}
                    seccion={art.seccion}
                    path={art.path}
                    pdfSrc={art.pdfSrc}
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center items-center my-10">
              <Link href="/publicaciones/boletin/page/1">
                <Button color="success">
                  Ver mas
                </Button>
              </Link>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
