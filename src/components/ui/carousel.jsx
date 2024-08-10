/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { upperFirst } from '@/lib/utils';

export default function Carousel({ articles }) {
  const [page, setPage] = useState(0);

  const paginate = (newDirection) => {
    if (page === 0 && newDirection === -1) {
      setPage(articles.length - 1);
    } else if (page === articles.length - 1 && newDirection === 1) {
      setPage(0);
    } else {
      setPage((prevPage) => prevPage + newDirection);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [page]);

  return (
    <header className="w-full flex relative overflow-hidden justify-center">
      <motion.img
        alt={articles[page].title}
        className="absolute w-full top-50 object-cover h-full brightness-50"
        src={articles[page].imgSrc}
      />
      <div className="z-10 flex flex-col gap-4 items-start justify-end w-full mt-28 lg:w-4/6 text-white p-10 lg:m-10 lg:mt-40 min-h-[350px]">
        <Link href={`/publicaciones/${articles[page].seccion}/page/1`}>
          <strong>{upperFirst(articles[page].seccion)}</strong>
          <div className="border-b-4 border-b-blue-800" />
        </Link>
        <Link
          className="text-3xl font-bold hover:underline"
          href={articles[page].path?.startsWith('http') ? articles[page].path : `/publicaciones/${articles[page].seccion.toLowerCase()}/${articles[page].path}`}
        >
          {articles[page].title}
        </Link>
        <summary>
          {articles[page].preview}
        </summary>
      </div>

      <div className="absolute bottom-4 w-full flex items-center justify-center h-10 gap-1 z-10">
        {
          Array.from({ length: articles.length }, (_, i) => (
            <button
              key={articles[i].title}
              type="button"
              onClick={() => setPage(i)}
              className={`h-3 rounded-full mx-1 transition-all duration-500 ${i === page ? 'w-14 bg-white' : 'w-3 bg-white/40'}`}
            >
              <span className="sr-only">Page</span>
            </button>
          ))
        }
      </div>

      <motion.button
        type="button"
        className="absolute top-1/2 right-4 flex justify-center items-center w-8 h-8 rounded-full
         bg-background/60 text-2xl p-2 z-10"
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ x: 10 }}
      >
        <img src="/derecho.svg" alt="pasar imagen" className="mr-[-3px]" />
      </motion.button>
      <motion.button
        type="button"
        className="absolute top-1/2 left-4 flex justify-center text-2xl items-center w-8 h-8 rounded-full
         bg-background/60 p-2 z-10"
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ x: -10 }}
      >
        <img src="/izquierdo.svg" alt="pasar imagen" className="ml-[-3px]" />
      </motion.button>
    </header>
  );
}
