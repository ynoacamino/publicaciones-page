'use client';

import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import ArticleBox from './ArticleBox';
import { upperFirst } from '@/lib/utils';
import { Button } from '../ui/button';

export default function PublicationsTabs({ sections }) {
  return (
    <div className="w-full bg-[#dadaff] flex justify-center items-center py-10 px-6">
      <div className="w-full max-w-6xl flex flex-col justify-center items-center">
        <Tabs defaultValue="jurisprudencia" className="w-full">
          <TabsList className="flex items-center justify-start">
            {
              sections.map((section) => (
                <TabsTrigger key={section.section} value={section.section}>
                  {upperFirst(section.section)}
                </TabsTrigger>
              ))
            }
          </TabsList>
          {
            sections.map((section) => (
              <TabsContent key={section.section} value={section.section}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-around">
                  {
                    section.articles.map((art) => (
                      <ArticleBox
                        key={art.title}
                        date={art.date}
                        author={art.author}
                        title={art.title}
                        imgSrc={art.imgSrc}
                        id={art._id.toString()}
                        seccion={art.seccion}
                        path={art.path}
                        pdfSrc={art.pdfSrc}
                      />
                    ))
                  }
                </div>
                <div className="w-full flex justify-center items-center my-10">
                  <Link href={`/publicaciones/${section.section}/page/1`}>
                    <Button>
                      Ver mas
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </div>
  );
}
