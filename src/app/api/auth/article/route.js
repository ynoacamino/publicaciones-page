import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Article from '@/db/models/Article';
import dbConnect from '@/db/dbConnect';
import { configAuth } from '../[...nextauth]/route';
import format from '@/lib/format';
import Section from '@/db/models/Section';

export async function POST(req) {
  const session = await getServerSession(configAuth);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });

  await dbConnect();

  const form = await req.formData();

  const sectionInput = form.get('seccion');

  const section = await Section.findOne({ name: sectionInput });

  if (!section) {
    const newSection = new Section({
      name: sectionInput,
    });

    try {
      await newSection.save();
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  const article = new Article({
    imgSrc: 'https://res.cloudinary.com/dux0sb99g/image/upload/v1698768957/whwq8givatdsdt9gylew.png',
    title: form.get('title'),
    author: form.get('author'),
    seccion: form.get('seccion'),
    preview: form.get('preview'),
    body: form.get('body'),
    date: form.get('date'),
    titleBody: form.get('titleBody'),
    path: format(form.get('title')),
    pdfSrc: form.get('pdfSrc'),
    link: form.get('link'),
    videoUrl: form.get('videoUrl'),
    authorImg: '/logo.svg',
    authorName: 'Miguel Salinas Vargas',
    authorPosition: 'Abogado',
    authorFacebook: 'https://www.facebook.com/migu.3110567',
  });

  try {
    article.save();
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ res: 'res' });
}

export async function PUT(req) {
  const session = await getServerSession(configAuth);

  if (!session) return NextResponse.json({ error: 'Wrong Credentials' }, { status: 401 });

  await dbConnect();

  const form = await req.formData();

  let article;
  try {
    article = await Article.findById(form.get('id'));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  if (!article) NextResponse.json({ error: 'Articulo no encontrado' }, { status: 400 });

  const sectionInput = form.get('seccion');

  const section = await Section.findOne({ name: sectionInput });

  if (!section) {
    const newSection = new Section({
      name: sectionInput,
    });

    try {
      await newSection.save();
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  article.title = form.get('title');
  article.author = form.get('author');
  if (form.get('imgSrc')) article.imgSrc = form.get('imgSrc');
  article.seccion = form.get('seccion');
  article.preview = form.get('preview');
  article.titleBody = form.get('titleBody');
  article.body = form.get('body');
  article.date = form.get('date');
  article.path = format(form.get('title'));
  if (form.get('pdfSrc')) article.pdfSrc = form.get('pdfSrc');
  article.link = form.get('link');

  if (form.get('videoUrl')) article.videoUrl = form.get('videoUrl');

  article.authorImg = '/logo.svg';
  article.authorName = 'Miguel Salinas Vargas';
  article.authorPosition = 'Abogado';
  article.authorFacebook = 'https://www.facebook.com/migu.3110567';

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
