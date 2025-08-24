
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import News, { INews } from '@/models/News';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const uploadDir = path.join(process.cwd(), '/public/uploads');

async function ensureUploadDirExists() {
  try {
    await fs.access(uploadDir);
  } catch (e) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

// GET all news articles
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const news = await News.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// POST a new news article
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    await ensureUploadDirExists();

    const formData = await req.formData();

    const imageFile = formData.get('imagePath') as File | null;
    if (!imageFile) {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    // Save the file
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const newsData: Partial<INews> = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      videoUrl: formData.get('videoUrl') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      isFeatured: formData.get('isFeatured') === 'true',
      imagePath: `/uploads/${filename}`,
    };

    const news = await News.create(newsData);
    return NextResponse.json({ success: true, data: news }, { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('POST Error:', error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
