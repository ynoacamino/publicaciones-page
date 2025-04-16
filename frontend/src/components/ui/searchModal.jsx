/* eslint-disable import/no-extraneous-dependencies */
import {
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';

import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import SearchBar from '../SearchBar';

export default function SearchModal() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Button variant="ghost" className="justify-start py-0 h-auto underlineEffect" onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon className="w-7 h-7 md:mr-4" />
        <span className="min-w-32 text-start hidden md:flex text-base font-normal">
          Buscar artículos
        </span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-accent w-full">
          <DialogHeader>
            <div className="w-full flex justify-between items-center">
              <DialogTitle>Busca tu articulo</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <SearchBar />
          </div>
        </DialogContent>
      </Dialog>
    </>

  );
}
