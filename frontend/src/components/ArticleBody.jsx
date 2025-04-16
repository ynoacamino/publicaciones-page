/* eslint-disable react/no-danger */
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import archivoPdf from '@/app/assets/archivo-pdf.svg';

import facebookIcon from '@/app/assets/facebook.png';
import whatsappIcon from '@/app/assets/whatsapp.png';
import telegramIcon from '@/app/assets/telegram.png';
import xIcon from '@/app/assets/x.png';

export default function ArticleBody({
  titleBody,
  body,
  pdfSrc,
  path,
  seccion,
}) {
  const SOCIAL = [
    {
      icon: facebookIcon,
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://miguelsalinasjuridico.com/publicaciones/${seccion.toLowerCase()}/${path}/`)}&src=sdkpreparse`,
    },
    {
      icon: whatsappIcon,
      name: 'Whatsapp',
      url: `https://wa.me/?text=${encodeURIComponent(`https://miguelsalinasjuridico.com/publicaciones/${seccion.toLowerCase()}/${path}/`)}`,
    },
    {
      icon: telegramIcon,
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(`https://miguelsalinasjuridico.com/publicaciones/${seccion.toLowerCase()}/${path}/`)}`,
    },
    {
      icon: xIcon,
      name: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`https://miguelsalinasjuridico.com/publicaciones/${seccion.toLowerCase()}/${path}/`)}`,
    },
  ];

  return (
    <article className="lg:col-span-2 rounded-md text-lg flex-1 w-full">
      <h2 className="text-2xl font-semibold">
        {titleBody}
      </h2>
      <div className="joditBox articleJoditBox" dangerouslySetInnerHTML={{ __html: body }} />
      <footer className="flex flex-col gap-2 font-bold ">
        <span>
          Para revisar la resolución completa:
        </span>
        {pdfSrc && (
        <div className="w-full flex justify-start items-center text-lg">
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
        </div>
        )}
        <span>
          Comparte este articulo en:
        </span>
        <div className="flex gap-2 py-1 flex-wrap">
          {
        SOCIAL.map((social) => (
          <Link target="_blank" href={social.url} className="px-4 py-2 flex flex-col items-center gap-2 hover:bg-slate-200" key={crypto.randomUUID()}>
            <Image src={social.icon} width={40} height={40} alt={social.name} />
            <span className="text-sm text-muted-foreground">
              {social.name}
            </span>
          </Link>
        ))
      }
        </div>
      </footer>
    </article>
  );
}
