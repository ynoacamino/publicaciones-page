import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/app/db/dbConnect';
import Article from '@/app/db/models/Article';
import { configAuth } from '../../[...nextauth]/route';

export async function PUT(req) {
  const session = await getServerSession(configAuth);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });
  dbConnect();
  const { id } = await req.json();
  let article;
  try {
    article = await Article.findByIdAndDelete(id);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ article });
}
