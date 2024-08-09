import Link from 'next/link';
import { upperFirst } from '@/lib/utils';
import Diccionario from '@/db/models/Diccionario';
import dbConnect from '@/db/dbConnect';

export const revalidate = 0;

/* eslint-disable react/no-danger */
const getData = async () => {
  await dbConnect();

  const diccionarios = await Diccionario.find();

  return diccionarios.map((d) => ({ word: d.word, description: d.description, id: d._id }));
};

export default async function DiccionarioPage() {
  const classifyAndShuffleWords = (diccionaio) => {
    const classification = {};

    diccionaio.forEach((w) => {
      const initialLetter = w.word[0].toUpperCase();

      if (!classification[initialLetter]) {
        classification[initialLetter] = [];
      }

      classification[initialLetter].push(w);
    });

    const result = Object
      .keys(classification)
      .map(
        (letter) => ({ letter, words: classification[letter] }),
      )
      .sort((a, b) => a.letter.localeCompare(b.letter));

    result.forEach((r) => {
      r.words.sort((a, b) => a.word.localeCompare(b.word));
    });

    return result;
  };

  const data = classifyAndShuffleWords(await getData());

  return (
    <main className="w-full flex flex-col items-center justify-start my-20">
      <div className="w-full max-w-7xl flex flex-col items-start gap-12">
        <span className="flex flex-col gap-4">
          <h1 className="text-4xl uppercase font-bold">Diccionario</h1>
          <div>
            <Link href="/admin/diccionario/add" className="px-4 py-3 rounded-md border border-black">
              Agregar palabra
            </Link>
          </div>
        </span>
        {
        data.map((l) => (
          <div key={crypto.randomUUID()} className="w-full">
            <h2 className="uppercase text-4xl font-bold text-muted-foreground">{l.letter}</h2>
            <div className="flex flex-col gap-8 pl-4 w-full">
              {
              l.words.map((w) => (
                <div key={w.id} className="w-full flex gap-2">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{upperFirst(w.word)}</h3>
                    <div dangerouslySetInnerHTML={{ __html: w.description }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/admin/diccionario/edit/${w.id}/`} className="px-4 py-2 rounded-md border border-black">
                      Editar
                    </Link>
                    <Link href={`/admin/diccionario/delete/${w.id}/`} className="px-4 py-2 rounded-md border border-black">
                      Eliminar
                    </Link>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
        ))
        }
      </div>
    </main>
  );
}
