import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import Section from '@/db/models/Section';

export async function GET() {
  await dbConnect();

  const results = await Section.find().sort({ createdAt: -1 });

  return NextResponse.json(results);
}
