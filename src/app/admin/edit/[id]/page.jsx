'use client';

import { useEffect, useState } from 'react';
import {
  Textarea, Divider, Select, SelectItem, Button, Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import ArticleContent from '@/app/components/ArticleContent';
import Jodit from '@/app/components/Jodit';

export default function EditArticle({ params }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [seccion, setSeccion] = useState(new Set([]));
  const [preview, setPreview] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [bodyTxt, setBodyTxt] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorPosition, setAuthorPosition] = useState('');
  const [authorFacebook, setAuthorFacebook] = useState('');

  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [authorImgFile, setAuthorImgFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(true);

  const [imgSrc, setImgSrc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [authorImg, setAuthorImg] = useState('');

  const router = useRouter();

  const secc = seccion.has('$.0') ? 'jurisprudencia' : 'boletin';

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
          setSeccion(art.data.article.seccion === 'jurisprudencia' ? new Set(['$.0']) : new Set(['$.1']));
          setPreview(art.data.article.preview);
          setTitleBody(art.data?.article?.titleBody);
          setBodyTxt(art.data.article.body);
          setDate(art.data.article.date);
          setLink(art.data.article.link);
          setImgSrc(art.data.article.imgSrc);
          setVideoUrl(art.data.article.videoUrl);
          setAuthorImg(art.data.article.authorImg);
          setAuthorName(art.data.article.authorName || 'Miguel Salinas Vargas');
          setAuthorPosition(art.data.article.authorPosition || 'Abogado');
          setAuthorFacebook(art.data.article.authorFacebook || 'https://www.facebook.com/migu.3110567');
        } catch (err) {
          toast.error('Datos corruptos');
        }
      }
    };
    getData();
    setLoadingGet(false);
  }, [params.id]);

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
    formData.append('seccion', seccion.has('$.0') ? 'jurisprudencia' : 'boletin');
    formData.append('preview', preview);
    formData.append('titleBody', titleBody);
    formData.append('body', bodyTxt);
    formData.append('date', date);
    formData.append('id', params.id);
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
        method: 'PUT',
        body: formData,
      });
      router.push('/admin');
    } catch (err) {
      toast.error('Error al subir los datos');
    }
  };

  if (loadingGet) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

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
        <span>
          Imagen previa, no cambiara hasta que guarde todos los cambios
        </span>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={title}
            className="max-w-md w-full my-4"

          />
        )}
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
          selectedKeys={seccion}
          onSelectionChange={setSeccion}
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
        <div className="joditBox">
          <Jodit
            placeholder="Escriba el contenido del articulo"
            content={bodyTxt}
            setContent={setBodyTxt}
          />
        </div>
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
          Link
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
        {videoUrl && (
        <video width="640" height="640" controls className="w-full max-w-5xl mx-10 my-10 h-auto border-2 border-zinc-300 shadow-lg">
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" src="captions.vtt" label="Espanish" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        )}
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
        {authorImg && (
        <img
          src={authorImg}
          alt={title}
          className="max-w-md w-full my-4"
        />
        )}
        <Divider className="my-4" />

        <ArticleContent
          link={link}
          body={bodyTxt}
          imgSrc="/bg.jpg"
          pdfSrc="/"
          preview={preview}
          seccion={secc}
          title={title}
          titleBody={titleBody}
          videoUrl={videoUrl}
          autorFacebook={authorFacebook}
          autorName={authorName}
          autorPosition={authorPosition}
        />

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
