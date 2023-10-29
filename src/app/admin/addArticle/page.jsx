'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Textarea, Divider, Select, SelectItem, Button,
} from '@nextui-org/react';
import axios from 'axios';

export default function AddArticle() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [seccion, setSeccion] = useState('');
  const [preview, setPreview] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.post('/api/auth/article', {
        title,
        author,
        imgSrc,
        seccion,
        preview,
        titleBody,
        body,
        date,
      });
    } catch (err) {
      console.error(err);
    }
    console.log(res);
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
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Imagen Url
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Imagen Url"
          className="max-w-3xl"
          value={imgSrc}
          onValueChange={setImgSrc}
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
        />
        <Divider className="my-4" />
        <h2 className="text-2xl font-semibold">
          Seccion
          {seccion}
        </h2>
        <Select
          label="Select"
          className="max-w-xs"
          variant="bordered"
          onChange={(e) => {
            if (e.target.value == '$.0') return setSeccion('jurisprudencia');
            if (e.target.value == '$.1') return setSeccion('articulos');
            return setSeccion('');
          }}
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
          maxRows={40}
          value={body}
          onValueChange={setBody}
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
        />
        <Divider className="my-12" />

        <div className="w-full flex justify-end items-center my-10">
          <Button type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}
