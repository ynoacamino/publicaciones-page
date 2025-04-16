import Section from '@/db/models/Section';
import TabPub from '../../components/Publicaciones/TabPub';
import dbConnect from '../../db/dbConnect';
import Article from '../../db/models/Article';
import Carousel from '@/components/ui/carousel';

export const metadata = {
  title: 'Publicaciones',
};

const getData = async ({ searchParams }) => {
  dbConnect();

  const sections = await Section.find();

  const populedSections = await Promise.all(sections.map(async (section) => ({
    section: section.name,
    articles: await Article.find({ seccion: new RegExp(section.name, 'i') }).sort({ createdAt: -1 }).limit(6),
  })));

  const lastPubs = await Article.find().sort({ createdAt: -1 }).limit(6);

  return {
    searchParams,
    lastPubs: lastPubs.map((p) => ({
      title: p.title,
      imgSrc: p.imgSrc,
      preview: p.preview,
      seccion: p.seccion,
      path: p.path,
    })),
    populedSections: populedSections.map((section) => ({
      section: section.section,
      articles: section.articles.map((article) => ({
        title: article.title,
        imgSrc: article.imgSrc,
        preview: article.preview,
        seccion: article.seccion,
        body: article.body,
        _id: article._id.toString(),
        pdfSrc: article.pdfSrc,
        author: article.author,
        path: article.path,
      })),
    })),
  };
};

export default async function Publicaiones({ searchParams }) {
  const data = await getData({ searchParams });

  return (
    <>
      <Carousel
        articles={data.lastPubs}
      />
      <div className="w-full flex flex-col items-center my-20 gap-10">
        <h1 className="uppercase text-4xl font-bold text-center">Publicaciones</h1>
        <TabPub sections={data.populedSections} />
      </div>
    </>
  );
}
