import dbConnect from '@/db/dbConnect';
import Article from '@/db/models/Article';
import Section from '@/db/models/Section';

export async function POST() {
  dbConnect();

  const sections = await Section.find();

  const populedSections = await Promise.all(sections.map(async (section) => ({
    section: section.name,
    articles: await Article.find({ seccion: new RegExp(section.name, 'i') }).sort({ createdAt: -1 }),
  })));

  return Response.json(populedSections);
}
