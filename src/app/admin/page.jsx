'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Divider } from '@nextui-org/react';
import axios from 'axios';
import ArticleBox from '../components/Publicaciones/ArticleBox';
import ButtonLink from '../components/ButtonLink';

export default function Admin() {
  const router = useRouter();
  const { status, data } = useSession();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      const arts = await axios.get('/api/auth/article');
      if (arts?.data)setArticles(arts.data.articles);
    };
    getData();
  }, []);

  const deleteArticle = async (id) => {
    await axios.put('/api/auth/article/delete', {
      id,
    });
    location.reload();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-20 gap-10">
      <Link href="/admin/addArticle" className="text-3xl">
        Agregar una publicacion
      </Link>
      <Divider className="my-8" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl my-5 text-center">
          Editar o eliminar una publicacion
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-around">
          {articles.map((art) => (
            <div key={art._id.toString()}>
              <ArticleBox
                key={art.title}
                date={art.date}
                author={art.author}
                title={art.title}
                imgSrc={art.imgSrc}
                id={art._id.toString()}
                seccion={art.seccion}
                path={art.path}
              />
              <div className="flex justify-end items-center gap-4 m-4">
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
    </div>
  );
}
