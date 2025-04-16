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
  const id = formData.get('id');

  if (word.length === 0 || description.length === 0) {
    return;
  }

  const diccionario = await Diccionario.findById(id);

  diccionario.word = word;
  diccionario.description = description;

  await diccionario.save();

  revalidatePath('/admin/diccionario', 'page');
  redirect('/admin/diccionario');
};
