/* eslint-disable react/no-danger */

'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SearchWordModal({ words }) {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [wordsPool, setWordsPool] = useState(words);

  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((op) => !op);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setWordsPool(words.filter((w) => w.word.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <>
      <Button variant="ghost" className="justify-start py-0 h-auto underlineEffect w-full" onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon className="w-7 h-7 md:mr-4" />
        <span className="min-w-32 text-start flex text-base font-normal pl-4">
          Buscar Palabra
        </span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-accent w-full">
          <DialogHeader>
            <div className="w-full flex justify-between items-center">
              <DialogTitle>Buscar una palabra</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input type="text" placeholder="Buscar..." className="w-full p-2" value={search} onChange={handleSearch} />
            <ScrollArea className="max-h-96">
              <div className="flex flex-col gap-2 pr-3">
                {
                wordsPool.map((w) => (
                  <button
                    key={w.word}
                    className="w-full flex gap-2 pl-2 py-2 text-base rounded-md hover:bg-zinc-200"
                    variant="ghost"
                    onClick={() => {
                      setOpen(false);
                      router.push(`/diccionario#diccionario-${w.word}`);
                    }}
                    type="button"
                  >
                    <div className="flex-1 w-full flex flex-col items-start justify-start">
                      <h3 className="text-xl font-bold">{w.word}</h3>
                      <div className="text-start" dangerouslySetInnerHTML={{ __html: w.description }} />
                    </div>
                  </button>
                ))
                }
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
