import Section from '@/db/models/Section';
import PreviewBody from '../../components/PreviewBody';
import TabPub from '../../components/Publicaciones/TabPub';
import dbConnect from '../../db/dbConnect';
import Article from '../../db/models/Article';

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

  const lastPub = await Article.findOne().sort({ createdAt: -1 });

  return {
    searchParams, lastPub, populedSections,
  };
};

export default async function Publicaiones({ searchParams }) {
  const data = await getData({ searchParams });

  console.log(data.populedSections);

  return (
    <>
      <PreviewBody
        title={data.lastPub.title}
        imgSrc={data.lastPub.imgSrc}
        preview={data.lastPub.preview}
        seccion={data.lastPub.seccion}
      />
      <TabPub sections={data.populedSections} />
    </>
  );
}
