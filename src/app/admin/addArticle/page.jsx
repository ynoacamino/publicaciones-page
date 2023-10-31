'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Textarea, Divider, Select, SelectItem, Button,
} from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';

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

    const body = bodyTxt.split('<enter>');

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
            if (e.target.value == '$.1') return setSeccion('articulo');
            return setSeccion('');
          }}
          isRequired
        >
          <SelectItem value="jurisprudencia">
            Jurisprudencia
          </SelectItem>
          <SelectItem value="articulos">
            Articulos
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
