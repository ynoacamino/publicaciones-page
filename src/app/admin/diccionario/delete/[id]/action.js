'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import dbConnect from '@/db/dbConnect';
import Diccionario from '@/db/models/Diccionario';

export const action = async (formData) => {
  await dbConnect();

  const id = formData.get('id');

  await Diccionario.findByIdAndDelete(id);

  revalidatePath('/admin/diccionario');
  redirect('/admin/diccionario');
};
