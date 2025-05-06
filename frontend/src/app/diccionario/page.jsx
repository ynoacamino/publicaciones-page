import Letter from '@/components/pages/diccionario/Letter';
import SearchWordModal from '@/components/pages/diccionario/SearchWordModal';
import api from '@/lib/api';

export const revalidate = 0;

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

  const query = await api.getFullGlosarios();

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
