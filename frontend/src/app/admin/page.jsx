'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import ArticleBox from '../../components/Publicaciones/ArticleBox';
import ButtonLink from '../../components/ButtonLink';
import Spinner from '@/components/ui/spinner';
import Divider from '@/components/ui/divider';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import { upperFirst } from '@/lib/utils';

export default function Admin() {
  const router = useRouter();
  const { status } = useSession();
  const [loadingGet, setLoadingGet] = useState(true);
  const [sections, setSections] = useState([]);

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
        setSections(arts.data);
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
      <Divider />
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-3xl my-5 text-center">
          Editar o eliminar una publicacion
        </h2>
        <div className="w-full bg-background flex justify-center items-center py-10 px-6">
          <div className="w-full max-w-7xl flex flex-col justify-center items-center">
            <Tabs defaultValue="jurisprudencia" className="w-full">
              <TabsList className="flex items-center justify-start">
                {
              sections.map((section) => (
                <TabsTrigger key={section.section} value={section.section}>
                  {upperFirst(section.section)}
                </TabsTrigger>
              ))
            }
              </TabsList>
              {
            sections.map((section) => (
              <TabsContent key={section.section} value={section.section}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 justify-around">
                  {
                    section.articles.map((art) => (
                      <div key={art._id.toString()} className="flex flex-col gap-4 items-start">
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
                          <Button color="danger" onClick={() => deleteArticle(art._id.toString())}>
                            Borrar
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </TabsContent>
            ))
          }
            </Tabs>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Button onClick={() => signOut()}>
          Cerrar sesion
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
