import * as fs from 'fs';
import type { Article, Glosary, Section } from './types';
import PocketBase, { type RecordModel } from 'pocketbase';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto';
dotenv.config();


const articlesRows = fs.readFileSync('./data/test.articles.json', 'utf-8');
let articles = JSON.parse(articlesRows) as Article[];
articles = articles.filter((a) => a.videoUrl)
console.log(articles.length)

const glosariesRows = fs.readFileSync('./data/test.diccionarios.json', 'utf-8');
const glosaries = JSON.parse(glosariesRows) as Glosary[];

const sectionsRows = fs.readFileSync('./data/test.sections.json', 'utf-8');
const sections = JSON.parse(sectionsRows) as Section[];

const POCKETBASE_URL = process.env.POCKETBASE_URL as string;

const pb = new PocketBase(POCKETBASE_URL);
pb.autoCancellation(false)

const SUPERUSER_EMAIL = process.env.SUPERUSER_EMAIL as string;
const SUPERUSER_PASSWORD = process.env.SUPERUSER_PASSWORD as string;

await pb.collection("_superusers").authWithPassword(SUPERUSER_EMAIL, SUPERUSER_PASSWORD)

glosaries.map(async (glosary) => {
  await pb.collection('glosarios').create({
    palabra: glosary.word,
    descripcion: glosary.description,
  }, {
    requestKey: glosary.word
  });
})

const sectionsPromises = sections.map((section) => {
  return pb.collection('secciones').create({
    name: section.name
  }, {
    requestKey: randomUUID()
  });
})

const sectionsUploaded = await Promise.all(sectionsPromises);

const author = await pb.collection('autores').create({
  name: "Miguel Salinas Vargas",
  posicion: "Abogado",
  link_facebook: "https://www.facebook.com/migu.3110567",
});

// upload articles
articles.map(async (article) => {
  let pdfBlob: Blob | null = null;
  if (article.pdfSrc) {
    const pdfResponse = await fetch(article.pdfSrc);
    pdfBlob = await pdfResponse.blob();
  }

  let videoBlob: Blob | null = null;
  if (article.videoUrl) {
    const videoResponse = await fetch(article.videoUrl);
    videoBlob = await videoResponse.blob();
  }

  const imageResponse = await fetch(article.imgSrc);
  const imageBlob = await imageResponse.blob();

  const formData = new FormData();

  if (pdfBlob) {
    const pdfFile = new File([pdfBlob], 'documento.pdf', { type: 'application/pdf' });
    formData.append('pdfs', pdfFile);
  }

  if (videoBlob) {
    const videoFile = new File([videoBlob], 'video.mp4', { type: 'video/mp4' });
    formData.append('video', videoFile);
  }

  const imageFile = new File([imageBlob], 'imagen.jpg', { type: 'image/jpeg' });
  formData.append('imagen', imageFile);

  let section = sectionsUploaded.find(section => section.name === article.seccion) as RecordModel;
  if (!section) {
    section = sectionsUploaded.find(section => section.name === "jurisprudencia") as RecordModel;
  }
  formData.append("seccion", section.id);

  formData.append("titulo", article.title);
  formData.append("previsualizacion", article.preview);
  formData.append("contenido", article.body);
  formData.append("titulo_del_contenido", article.titleBody);
  formData.append("fecha_de_publicacion", article.createdAt.$date);
  formData.append("autor", author.id);
  formData.append("slug", article.path);

  try {

  await pb.collection('publicaciones').create(formData, {
    requestKey: randomUUID()
  });
  } catch (error) {
    console.log(article);
    console.error(error);
  }
})
