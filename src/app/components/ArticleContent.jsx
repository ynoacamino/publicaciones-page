/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import PreviewBody from './PreviewBody';
import archivoPdf from '@/app/assets/archivo-pdf.svg';
import ArticleAside from './ArticleAside';

export default function ArticleContent({
  imgSrc,
  title,
  seccion,
  preview,
  link,
  titleBody,
  body,
  pdfSrc,
  videoUrl,
  autorName,
  autorImg,
  autorPosition,
  autorFacebook,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <PreviewBody
        imgSrc={imgSrc}
        title={title}
        seccion={seccion}
        preview={preview}
      />
      {
        (link && link.startsWith('https://www.youtube.com')) && (
          <aside className="w-11/12 md:w-7/12 grid grid-cols-4 gap-8 py-20 items-start">
            <iframe
              className="w-[300px] sm:w-[400px] md:w-[600px] xl:w-[1000px] aspect-video"
              src={link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </aside>
        )
      }
      {
        videoUrl && (
          <video width="640" height="640" controls className="w-full max-w-7xl mx-10 my-10 h-auto border-2 border-zinc-300 shadow-lg">
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" src="captions.vtt" label="Espanish" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        )
      }
      <div className="max-w-7xl w-full grid grid-cols-1 xl:grid-cols-4 gap-y-8 xl:gap-8 px-10 py-20 items-start">
        <article className="col-span-3 p-8 rounded-md bg-gray-200 text-lg">
          <h2 className="text-2xl font-semibold">
            {titleBody}
          </h2>
          <div className="joditBox articleJoditBox" dangerouslySetInnerHTML={{ __html: body }} />
          <footer className="flex flex-col gap-2">
            <span>
              Para revisar la casación completa
            </span>
            {pdfSrc && (
            <div className="w-full flex justify-start items-center">
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
            </div>
            )}
          </footer>
        </article>
        <ArticleAside
          autorFacebook={autorFacebook}
          autorImg={autorImg}
          autorName={autorName}
          autorPosition={autorPosition}
        />
      </div>
    </div>
  );
}
