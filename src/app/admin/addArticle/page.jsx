'use client';

import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectItem, SelectTrigger, SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import ArticleBody from '@/components/ArticleBody';

const Jodit = dynamic(() => import('../../../components/Jodit'), { ssr: false });

export default function AddArticle() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [bodyTxt, setBodyTxt] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [authorName, setAuthorName] = useState('Miguel Salinas Vargas');
  const [authorPosition, setAuthorPosition] = useState('Abogado');
  const [authorFacebook, setAuthorFacebook] = useState('https://www.facebook.com/migu.3110567');

  const [seccion, setSeccion] = useState('');
  const [seccionText, setSeccionText] = useState('');

  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [authorImgFile, setAuthorImgFile] = useState(null);

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

    const formVideo = new FormData();
    formVideo.append('file', video);
    formVideo.append('upload_preset', 'images');

    const formAuthorImgFile = new FormData();
    formAuthorImgFile.append('file', authorImgFile);
    formAuthorImgFile.append('upload_preset', 'images');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('seccion', seccionText.length > 0 ? seccionText : seccion);
    formData.append('preview', preview);
    formData.append('titleBody', titleBody);
    formData.append('body', bodyTxt);
    formData.append('date', date);
    formData.append('link', link);
    formData.append('authorName', authorName);
    formData.append('authorPosition', authorPosition);
    formData.append('authorFacebook', authorFacebook);

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
    if (video) {
      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dux0sb99g/upload',
          {
            method: 'POST',
            body: formVideo,
          },
        );
        const fileVideo = await res.json();
        formData.append('videoUrl', fileVideo.secure_url);
      } catch (err) {
        console.error(err);
      }
    }
    if (authorImgFile) {
      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dux0sb99g/upload',
          {
            method: 'POST',
            body: formAuthorImgFile,
          },
        );
        const fileImgFile = await res.json();
        formData.append('authorImg', fileImgFile.secure_url);
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
        <div className="my-10" />
        <h2 className="text-2xl font-semibold">
          Imagen
        </h2>
        <input
          type="file"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <div className="my-10" />
        <h2 className="text-2xl font-semibold">
          Pdf
        </h2>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className="my-10" />
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
        <div className="my-10" />
        <h2 className="text-2xl font-semibold">
          Seccion
        </h2>
        <Select
          label="Select"
          className="max-w-xs"
          onValueChange={setSeccion}
          value={seccion}
          disabled={seccionText.length > 0}
          isRequired
        >
          <SelectTrigger>
            <SelectValue placeholder="Seccion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jurisprudencia">
              Jurisprudencia
            </SelectItem>
            <SelectItem value="boletin">
              Boletines
            </SelectItem>
          </SelectContent>
        </Select>
        <span>
          o
        </span>
        <Input
          type="text"
          placeholder="Otra seccion"
          value={seccionText}
          onChange={(e) => setSeccionText(e.target.value)}
        />
        <div className="my-10" />
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
        <div className="my-10" />
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
        <div className="my-10" />
        <h2 className="text-2xl font-semibold">
          Cuerpo
        </h2>
        <div className="joditBox">
          <Jodit
            placeholder="Escriba el contenido del articulo"
            content={bodyTxt}
            setContent={setBodyTxt}
          />
        </div>
        <div className="my-10" />
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
        <Divider className="my-12" />
        <h2 className="text-2xl font-semibold">
          Video
        </h2>
        <input
          type="file"
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
        />
        <Divider className="my-12" />
        <h1 className="text-3xl font-bold">
          Informacion lateral
        </h1>

        <Divider className="my-12" />
        <h2 className="text-2xl font-semibold">
          Nombre del autor
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Miguel Salinas Vargas"
          className="max-w-3xl"
          value={authorName}
          onValueChange={setAuthorName}
          isRequired
        />

        <Divider className="my-12" />
        <h2 className="text-2xl font-semibold">
          Titulo del autor
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="Abogado"
          className="max-w-3xl"
          value={authorPosition}
          onValueChange={setAuthorPosition}
          isRequired
        />

        <Divider className="my-12" />
        <h2 className="text-2xl font-semibold">
          Link de facebook del autor
        </h2>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder="https://www.facebook.com/migu.3110567"
          className="max-w-3xl"
          value={authorFacebook}
          onValueChange={setAuthorFacebook}
          isRequired
        />

        <Divider className="my-12" />
        <h2 className="text-2xl font-semibold">
          Imagen de perfil del autor
        </h2>
        <h3>
          *POR DEFECTO SE USARA LA IMAGEN DE PERFIL DE MIGUEL SALINAS VARGAS
        </h3>
        <input
          type="file"
          onChange={(e) => {
            setAuthorImgFile(e.target.files[0]);
          }}
        />

        <div className="my-10" />

        <ArticleBody
          link={link}
          body={bodyTxt}
          imgSrc="/bg.jpg"
          pdfSrc="/"
          preview={preview}
          seccion={seccion}
          title={title}
          titleBody={titleBody}
          autorFacebook={authorFacebook}
          autorName={authorName}
          autorPosition={authorPosition}
        />

        <div className="my-10" />

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
