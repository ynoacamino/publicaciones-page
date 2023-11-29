import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import PreviewBody from './PreviewBody';
import logo from '@/app/assets/gold.svg';
import facebook from '@/app/assets/facebook.svg';
import archivoPdf from '@/app/assets/archivo-pdf.svg';

export default function ArticleContent({
  imgSrc, title, seccion, preview, link, titleBody, body, pdfSrc,
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
        <aside className="w-full rounded-md bg-gray-200  xl:sticky xl:top-36 md:col-span-1 min-w-min">
          <div className="p-8 flex flex-col justify-center items-center">
            <Image
              src={logo}
              alt="logo"
              className="m-3"
              width={100}
              height={100}
            />
            <h3 className="text-2xl font-bold text-center">
              Miguel Salinas Vargas
            </h3>
            <span>
              Abogado
            </span>
          </div>
          <div className="bg-[#191970] rounded-b-md px-8 py-4 flex justify-center items-center text-white font-bold">
            <Link href="https://www.facebook.com/migu.3110567" target="_blank">
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
      </div>
    </div>
  );
}
