'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button, Chip, Divider, Spinner,
} from '@nextui-org/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ArticleBox from '../components/Publicaciones/ArticleBox';
import ButtonLink from '../components/ButtonLink';

export default function Admin() {
  const router = useRouter();
  const { status } = useSession();
  const [articles, setArticles] = useState([]);
  const [jurisprudencia, setJurisprudencia] = useState([]);
  const [loadingGet, setLoadingGet] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  useEffect(() => {
    const getData = async () => {
      let arts;
      try {
        arts = await axios.post('/api/auth/article/divide');
      } catch (err) {
        toast.error('Error al recuperar los datos');
      }
      if (arts?.data) {
        setArticles(arts.data.articleArticulo);
        setJurisprudencia(arts.data.articleJuris);
      }
    };
    getData();
    setLoadingGet(false);
  }, []);

  const deleteArticle = async (id) => {
    await axios.put('/api/auth/article/delete', {
      id,
    });
    location.reload();
  };

  if (loadingGet) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-20 gap-10">
      <Link href="/admin/addArticle" className="text-3xl">
        <Button className="text-3xl">
          Agregar una publicacion
        </Button>
      </Link>
      <Divider className="my-8" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl my-5 text-center">
          Editar o eliminar una publicacion
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-around">
          {articles.map((art) => (
            <div key={art._id.toString()} className="flex flex-col gap-4">
              <Chip radius="sm" size="md">
                {art.seccion}
              </Chip>
              <ArticleBox
                key={art.title}
                date={art.date}
                author={art.author}
                title={art.title}
                imgSrc={art.imgSrc}
                id={art._id.toString()}
                seccion={art.seccion}
                path={art.path}
                pdfSrc={art.pdfSrc}
              />
              <div className="flex justify-end items-center gap-4">
                <ButtonLink color="warning" path={`/admin/edit/${art._id.toString()}`}>
                  Editar
                </ButtonLink>
                <Button color="danger" onPress={() => deleteArticle(art._id.toString())}>
                  Borrar
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-around">
          {jurisprudencia.map((art) => (
            <div key={art._id.toString()} className="flex flex-col gap-4">
              <Chip radius="sm" size="md">
                {art.seccion}
              </Chip>
              <ArticleBox
                key={art.title}
                date={art.date}
                author={art.author}
                title={art.title}
                imgSrc={art.imgSrc}
                id={art._id.toString()}
                seccion={art.seccion}
                path={art.path}
                pdfSrc={art.pdfSrc}
              />
              <div className="flex justify-end items-center gap-4">
                <ButtonLink color="warning" path={`/admin/edit/${art._id.toString()}`}>
                  Editar
                </ButtonLink>
                <Button color="danger" onPress={() => deleteArticle(art._id.toString())}>
                  Borrar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Button onPress={() => signOut()}>
          Cerrar sesion
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
