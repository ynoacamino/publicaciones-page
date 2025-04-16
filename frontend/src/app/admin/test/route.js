import dbConnect from '@/db/dbConnect';
import Section from '@/db/models/Section';

export async function POST() {
  await dbConnect();

  const newSetion = new Section({
    name: 'boletin',
  });

  try {
    await newSetion.save();
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }

  return Response.json({ section: newSetion });
}
