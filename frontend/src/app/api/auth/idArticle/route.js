import { NextResponse } from 'next/server';
import Article from '@/db/models/Article';

export async function GET(req) {
  const id = req.nextUrl.searchParams.get('id');
  let article;
  try {
    article = await Article.findById(id);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ article });
}
