'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Textarea, Divider, Select, SelectItem, Button,
} from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.svg';
import facebook from '@/app/assets/facebook.svg';
import PreviewBody from '@/app/components/PreviewBody';

export default function AddArticle() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState(null);
  const [seccion, setSeccion] = useState('');
  const [preview, setPreview] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [bodyTxt, setBodyTxt] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formImg = new FormData();
    formImg.append('file', img);
    formImg.append('upload_preset', 'images');

    const formFile = new FormData();
    formFile.append('file', file);
    formFile.append('upload_preset', 'images');

    // const body = bodyTxt.split('<enter>');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('seccion', seccion);
    formData.append('preview', preview);
    formData.append('titleBody', titleBody);
    formData.append('body', bodyTxt);
    formData.append('date', date);
    formData.append('link', link);

    if (img) {
      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dux0sb99g/upload',
          {
            method: 'POST',
            body: formImg,
          },
        );
        const fileImg = await res.json();
        formData.append('imgSrc', fileImg.secure_url);
      } catch (err) {
        console.error(err);
      }
    }
    if (file) {
      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dux0sb99g/upload',
          {
            method: 'POST',
            body: formFile,
          },
        );
        const fileFile = await res.json();
        formData.append('pdfSrc', fileFile.secure_url);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await fetch('/api/auth/article', {
        method: 'POST',
        body: formData,
      });
      router.push('/admin');
    } catch (err) {
      toast.error('Error al subir los datos');
    }
  };
  return (
    <div className="w-full flex justify-center py-20">
      <form className="w-11/12 lg:w-6/12" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold my-8">
          Añade un articulo
        </h1>
        <h2 className="text-2xl font-semibold">
          Titulo
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Titulo"
          className="max-w-3xl"
          value={title}
          onValueChange={setTitle}
          isRequired
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Imagen
        </h2>
        <input
          type="file"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Pdf
        </h2>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Autor
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Autor"
          className="max-w-3xl"
          value={author}
          onValueChange={setAuthor}
          isRequired
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Seccion
        </h2>
        <Select
          label="Select"
          className="max-w-xs"
          variant="bordered"
          onChange={(e) => {
            if (e.target.value == '$.0') return setSeccion('jurisprudencia');
            if (e.target.value == '$.1') return setSeccion('boletin');
            return setSeccion('');
          }}
          isRequired
        >
          <SelectItem value="jurisprudencia">
            Jurisprudencia
          </SelectItem>
          <SelectItem value="boletin">
            Boletines
          </SelectItem>
        </Select>
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Preview
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Preview"
          className="max-w-3xl"
          value={preview}
          onValueChange={setPreview}
          isRequired
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Titulo del contenido
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Titulo del contenido"
          className="max-w-3xl"
          value={titleBody}
          onValueChange={setTitleBody}
          isRequired
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Cuerpo
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Cuerpo"
          className="max-w-3xl"
          maxRows={80}
          value={bodyTxt}
          onValueChange={setBodyTxt}
          isRequired
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Fecha
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Fecha"
          className="max-w-3xl"
          value={date}
          onValueChange={setDate}
          isRequired
        />
        <Divider className="my-12" />
        <h2 className="text-2xl font-semibold">
          Link youtube
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Fecha"
          className="max-w-3xl"
          value={link}
          onValueChange={setLink}
        />

        <Divider className="my-4" />

        <div className="w-full flex flex-col items-center">
          <PreviewBody
            imgSrc="https://cdn.discordapp.com/attachments/772232222220615710/1169139656240144394/bg.jpg?ex=65545127&is=6541dc27&hm=b90b3d8fa5dfb47939ce504672fbc87aeb9a77d0cdb472a83b439e74fda23c5e&"
            title={title}
            seccion={seccion}
            preview={preview}
          />
          {
            (link && link.startsWith('https://www.youtube.com')) && (
              <div className="w-11/12 md:w-7/12 grid grid-cols-4 gap-8 py-20 items-start">
                <iframe
                  className="w-[300px] sm:w-[400px] md:w-[600px] xl:w-[1000px] aspect-video"
                  src={link}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            )
          }
          <div className="w-full flex justify-center items-center">
            <div className="w-11/12 xl:w-8/12 grid grid-cols-1 xl:grid-cols-4 gap-y-8 xl:gap-8 py-20 items-start">
              <article className="col-span-3 p-8 rounded-md bg-gray-200 text-lg">
                <h2 className="text-2xl font-semibold">
                  {titleBody}
                </h2>
                {bodyTxt.split('<enter>').map((p) => (
                  <p key={p} className=" text-justify">
                    {p}
                  </p>
                ))}
                <p className="flex flex-col gap-2 text-justify">
                  <span>
                    Para revisar la sentencia completa y otras
                    jurisprudencias únete a nuestra COMUNIDAD:
                  </span>
                  <span>- Telegram: Canal de la Comunidad Pariona Abogados</span>
                  <span>- WhatsApp: Comunidad Pariona Abogados</span>
                </p>
              </article>
              <div className="w-full rounded-md bg-gray-200  xl:sticky xl:top-36 md:col-span-1 min-w-min">
                <div className="p-8 flex flex-col justify-center items-center">
                  <Image
                    src={logo}
                    alt="logo"
                    className="rounded-full bg-red-600 p-1 m-3"
                    width={100}
                    height={100}
                  />
                  <span className="text-2xl font-bold text-center">
                    Miguel Salinas Vargas
                  </span>
                  <span>
                    Abogado
                  </span>
                </div>
                <div className="bg-red-600 rounded-b-md px-8 py-4 flex justify-center items-center text-white font-bold">
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
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-4" />

        <div className="w-full flex justify-end items-center my-10">
          <Button type="submit" isLoading={loading}>
            Guardar
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
