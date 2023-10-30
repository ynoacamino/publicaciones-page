'use client';

import { useEffect, useState } from 'react';
import {
  Textarea, Divider, Select, SelectItem, Button,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function EditArticle({ params }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [seccion, setSeccion] = useState('');
  const [preview, setPreview] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      let art;
      try {
        art = await axios.get('/api/auth/idArticle', {
          params: {
            id: params.id,
          },
        });
      } catch (err) {
        toast.error('Error al recuperar datos');
      }
      if (art?.data) {
        try {
          setTitle(art.data.article.title);
          setAuthor(art.data.article.author);
          setImgSrc(art.data.article.imgSrc);
          setSeccion(art.data.article.seccion);
          setPreview(art.data.article.preview);
          setTitleBody(art.data?.article?.titleBody);
          setBody(art.data.article.body);
          setDate(art.data.article.date);
        } catch (err) {
          toast.error('Datos corruptos');
        }
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/auth/article', {
        title,
        author,
        imgSrc,
        seccion,
        preview,
        titleBody,
        body,
        date,
        id: params.id,
      });
    } catch (err) {
      toast.error('Error al subir los datos');
    }
    router.push('/admin');
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
          Imagen Url
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Imagen Url"
          className="max-w-3xl"
          value={imgSrc}
          onValueChange={setImgSrc}
          isRequired
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
          isRequired
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
          maxRows={40}
          value={body}
          onValueChange={setBody}
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

        <div className="w-full flex justify-end items-center my-10">
          <Button type="submit">
            Guardar
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
