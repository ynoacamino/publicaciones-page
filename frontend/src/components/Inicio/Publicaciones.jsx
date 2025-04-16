import TabPub from '@/components/Publicaciones/TabPub';
import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import Section from '@/db/models/Section';

const getData = async (params) => {
  dbConnect();

  const sections = await Section.find();

  const populedSections = await Promise.all(sections.map(async (section) => ({
    section: section.name,
    articles: await Article.find({ seccion: new RegExp(section.name, 'i') }).sort({ createdAt: -1 }).limit(6),
  })));

  return {
    params, populedSections,
  };
};

export default async function Publicaciones({ searchParams }) {
  const data = JSON.parse(JSON.stringify(await getData(searchParams)));

  return (
    <div className="bg-background w-full flex flex-col justify-center items-center py-20 gap-16">
      <div className="flex w-full flex-col">
        <TabPub sections={data.populedSections} />
      </div>
    </div>
  );
}
