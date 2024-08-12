/* eslint-disable react/no-danger */
import { upperFirst } from '@/lib/utils';

export default function Letter({ letter, words }) {
  return (
    <div className="w-full">
      <h2 className="uppercase text-4xl font-bold text-muted-foreground">{letter}</h2>
      <div className="flex flex-col gap-8 pl-4 w-full">
        {
      words.map((w) => (
        <div key={w.word} className="w-full flex gap-2" id={`diccionario-${w.word}`}>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{upperFirst(w.word)}</h3>
            <div dangerouslySetInnerHTML={{ __html: w.description }} />
          </div>
        </div>
      ))
        }
      </div>
    </div>
  );
}
