import { NextResponse } from 'next/server';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';

export async function PUT(req) {
  dbConnect();
  const { id } = await req.json();
  console.log(id);
  let article;
  try {
    article = await Article.findByIdAndDelete(id);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ article });
}
