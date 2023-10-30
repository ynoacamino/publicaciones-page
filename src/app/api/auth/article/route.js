import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import Article from '@/app/db/models/Article';
import dbConnect from '@/app/db/dbConnect';
import { configAuth } from '../[...nextauth]/route';
import format from '@/app/utils/format';

cloudinary.config({
  cloud_name: 'dux0sb99g',
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

export async function POST(req) {
  const session = await getServerSession(configAuth);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });

  await dbConnect();

  const form = await req.formData();

  const image = form.get('img');

  if (!image) NextResponse.json({ error: 'Nesesita subir una imagen' }, { status: 400 });

  const article = new Article({
    imgSrc: ' ',
    title: form.get('title'),
    author: form.get('author'),
    seccion: form.get('seccion'),
    preview: form.get('preview'),
    body: form.get('body'),
    date: form.get('date'),
    titleBody: form.get('titleBody'),
    path: format(form.get('title')),
  });

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), 'public', `${article.id}${path.extname(image.name)}`);

  await writeFile(filePath, buffer);

  const imgData = await cloudinary.uploader.upload(filePath);

  article.imgSrc = imgData.secure_url;

  try {
    article.save();
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ data: 'data' });
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
  const articles = await Article.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ articles });
}
