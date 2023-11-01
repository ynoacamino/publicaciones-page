import { NextResponse } from 'next/server';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';

export async function POST() {
  dbConnect();
  const articleJuris = await Article.find({ seccion: new RegExp('jurisprudencia', 'i') }).sort({ createdAt: -1 }).limit(4);
  const articleArticulo = await Article.find({ seccion: new RegExp('boletin', 'i') }).sort({ createdAt: -1 }).limit(4);

  return NextResponse.json({ articleArticulo, articleJuris });
}
