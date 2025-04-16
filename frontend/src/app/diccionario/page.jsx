import Diccionario from '@/db/models/Diccionario';
import dbConnect from '@/db/dbConnect';
import Letter from '@/components/pages/diccionario/Letter';
import SearchWordModal from '@/components/pages/diccionario/SearchWordModal';

export const revalidate = 0;

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

  const query = await getData();

  const data = classifyAndShuffleWords(query.sort((a, b) => a.word.localeCompare(b.word)));

  return (
    <main className="w-full flex flex-col items-center justify-start my-20">
      <div className="w-full max-w-7xl flex flex-col items-start gap-12 px-6">
        <span className="flex flex-col gap-4">
          <h1 className="text-4xl uppercase font-bold">Diccionario</h1>
        </span>
        <SearchWordModal words={query.map((w) => ({ word: w.word, description: w.description }))} />
        {
          data.map((l) => (
            <Letter
              key={l.letter}
              letter={l.letter}
              words={l.words.map((w) => ({
                letter: w.letter, word: w.word, description: w.description,
              }))}
            />
          ))
        }
      </div>
    </main>
  );
}
