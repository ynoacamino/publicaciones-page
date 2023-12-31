import { NextResponse } from 'next/server';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';

export async function POST() {
  dbConnect();
  const articleJuris = await Article.find({ seccion: new RegExp('jurisprudencia', 'i') }).sort({ createdAt: -1 });
  const articleArticulo = await Article.find({ seccion: new RegExp('boletin', 'i') }).sort({ createdAt: -1 });

  return NextResponse.json({ articleArticulo, articleJuris });
}
