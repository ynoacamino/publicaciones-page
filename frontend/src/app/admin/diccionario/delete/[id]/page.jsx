/* eslint-disable react/no-danger */
import { redirect } from 'next/navigation';
import { upperFirst } from '@/lib/utils';
import { action } from './action';
import { Button } from '@/components/ui/button';
import Diccionario from '@/db/models/Diccionario';
import dbConnect from '@/db/dbConnect';

const getData = async ({ id }) => {
  await dbConnect();

  try {
    const diccionario = await Diccionario.findById(id);

    if (!diccionario) {
      redirect('/admin/diccionario');
    }

    return diccionario;
  } catch (error) {
    console.error(error);
    redirect('/admin/diccionario');
    return null;
  }
};

export default async function EditWordPage({ params }) {
  const { id } = params;

  const data = await getData({ id });

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <form action={action} className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center w-full">
          Seguro que quiere eliminar la palabra
          {' '}
          {data.word}
        </h1>

        <div className="flex-1">
          <h3 className="text-xl font-bold">{upperFirst(data.word)}</h3>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>

        <input type="hidden" name="id" value={id} />

        <Button type="submit">
          Eliminar
        </Button>
      </form>
    </main>
  );
}
