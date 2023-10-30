'use client';

import {
  Tabs, Tab,
} from '@nextui-org/react';
import ArticleBox from '@/app/components/Publicaciones/ArticleBox';
import ButtonLink from '../ButtonLink';

export default function PublicationsTabs({ articleArticulo, articleJuris }) {
  return (
    <div className="w-full flex justify-center items-center my-10">
      <div className="w-11/12 md:w-8/12 flex flex-col justify-center items-center">
        <Tabs aria-label="Options">
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
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center items-center my-10">
              <ButtonLink path="/publicaciones/jurisprudencia/page/1">
                Ver mas
              </ButtonLink>
            </div>
          </Tab>
          <Tab title="Articulos">
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
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center items-center my-10">
              <ButtonLink path="/publicaciones/articulo/page/1">
                Ver mas
              </ButtonLink>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
