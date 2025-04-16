'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './button';

import facebookIcon from '@/app/assets/facebook.png';
import whatsappIcon from '@/app/assets/whatsapp.png';
import telegramIcon from '@/app/assets/telegram.png';
import xIcon from '@/app/assets/x.png';
// `https://www.facebook.com/sharer/sharer.php?u=https://miguelsalinasjuridico.com/publicaciones/${seccion.toLowerCase()}/${path}/&src=sdkpreparse`

export default function ShareButton({ path, seccion }) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Compartir
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Comparte en:</DialogTitle>
          <div className="flex gap-4 py-3 flex-wrap">
            {
              SOCIAL.map((social) => (
                <Link target="_blank" href={social.url} className="p-4 py-2 flex flex-col items-center gap-2 hover:bg-slate-200" key={crypto.randomUUID()}>
                  <Image src={social.icon} width={50} height={50} alt={social.name} />
                  <span className="text-sm text-muted-foreground">
                    {social.name}
                  </span>
                </Link>
              ))
            }
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
