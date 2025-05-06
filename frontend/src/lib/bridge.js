import { BACKEND_URL } from '@/config/variables';

export const glosarioBridge = (records) => records.map((record) => ({
  word: record.palabra,
  description: record.descripcion,
  id: record.id,
}));

export const publicacionesBridge = (records) => records.map((record) => {
  const imageUrl = `${BACKEND_URL}/api/files/${record.collectionId}/${record.id}/${record.imagen}`;

  const videoUrl = record.video ? `${BACKEND_URL}/api/files/${record.collectionId}/${record.id}/${record.video}` : null;

  const pdfsUrl = record.pdfs.map((pdf) => `${BACKEND_URL}/api/files/${record.collectionId}/${record.id}/${pdf}`);

  return {
    title: record.titulo,
    preview: record.previsualizacion,
    body: record.contenido,
    imgSrc: imageUrl,
    titleBody: record.titulo_del_contenido,
    date: record.fecha_de_publicacion,
    pdfs: pdfsUrl,
    author: record.autor,
    seccion: record.expand.seccion.name,
    path: record.slug,
    videoUrl,
    created: record.created,
    updated: record.updated,
  };
});
