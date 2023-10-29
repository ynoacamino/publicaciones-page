import { NextResponse } from 'next/server';
import Article from '@/app/db/models/Article';
import dbConnect from '@/app/db/dbConnect';

export async function GET() {
  await dbConnect();
  let article;
  try {
    article = await Article.findOne({}, {}, { sort: { _id: -1 } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ article });
}
