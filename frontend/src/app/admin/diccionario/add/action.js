'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import dbConnect from '@/db/dbConnect';
import Diccionario from '@/db/models/Diccionario';

export const action = async (formData) => {
  'use server';

  await dbConnect();

  const word = formData.get('word');
  const description = formData.get('description');

  if (word.length === 0 || description.length === 0) {
    return;
  }

  const diccionarioExist = await Diccionario.findOne({ word });

  if (diccionarioExist) {
    redirect('/admin/diccionario');
  }

  const diccionario = new Diccionario({
    word,
    description,
  });

  await diccionario.save();

  revalidatePath('/admin/diccionario', 'page');
  redirect('/admin/diccionario');
};
