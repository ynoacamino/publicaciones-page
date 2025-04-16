import { redirect } from 'next/navigation';
import dbConnect from '@/db/dbConnect';
import FormEditWord from './FormEditWord';
import Diccionario from '@/db/models/Diccionario';

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
    <FormEditWord
      id={data.id}
      word={data.word}
      description={data.description}
    />
  );
}
