'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { action } from './action';

const Jodit = dynamic(() => import('../../../../components/Jodit'), { ssr: false });

export default function AddWordPage() {
  const [content, setContent] = useState('');

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <form action={action} className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center w-full">
          Agregar palabra
        </h1>
        <Label>
          <span>
            Palabra
          </span>
          <Input name="word" />
        </Label>
        <Label>
          <span>
            Descripción
          </span>
          <Jodit
            content={content}
            setContent={setContent}
            placeholder="Descripción de la palabra"
          />
          <input type="hidden" name="description" value={content} />
        </Label>
        <Button type="submit">
          Guardar
        </Button>
      </form>
    </main>
  );
}
