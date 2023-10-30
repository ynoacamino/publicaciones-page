import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Article from '@/app/db/models/Article';
import dbConnect from '@/app/db/dbConnect';
import { configAuth } from '../[...nextauth]/route';
import format from '@/app/utils/format';

export async function POST(req) {
  const session = await getServerSession(configAuth);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });

  await dbConnect();
  const {
    title,
    author,
    imgSrc,
    seccion,
    preview,
    titleBody,
    body,
    date,
  } = await req.json();

  const article = new Article({
    imgSrc,
    title,
    author,
    seccion: seccion.toLowerCase(),
    preview,
    body,
    date,
    titleBody,
    path: format(title),
  });

  try {
    article.save();
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ article });
}

export async function PUT(req) {
  const session = await getServerSession(configAuth);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });
  await dbConnect();
  const {
    title,
    author,
    imgSrc,
    seccion,
    preview,
    titleBody,
    body,
    date,
    id,
  } = await req.json();

  let article;
  try {
    article = await Article.findById(id);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  if (!article) NextResponse.json({ error: 'Articulo no encontrado' }, { status: 400 });

  article.title = title;
  article.author = author;
  article.imgSrc = imgSrc;
  article.seccion = seccion;
  article.preview = preview;
  article.titleBody = titleBody;
  article.body = body;
  article.date = date;

  try {
    await article.save();
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  return NextResponse.json({ article });
}

export async function GET() {
  await dbConnect();
  const articles = await Article.find({});
  return NextResponse.json({ articles });
}
