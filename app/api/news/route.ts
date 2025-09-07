import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import dbConnect from '@/lib/dbConnect';
import News from '@/models/News';

const uploadsDirectory = path.join(process.cwd(), 'public', 'uploads');

export async function GET() {
  try {
    await dbConnect();
    const newsData = await News.find({});
    return NextResponse.json({ success: true, data: newsData });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('imagePath') as File;
    const tags = formData.get('tags') as string;
    const isFeatured = formData.get('isFeatured') === 'true';

    if (!title || !content || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Handle file upload
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${Date.now()}_${imageFile.name}`;
    const imagePath = path.join(uploadsDirectory, imageName);
    await fs.writeFile(imagePath, imageBuffer);

    const newArticle = new News({
      title,
      content,
      imagePath: `/uploads/${imageName}`,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isFeatured,
    });

    await newArticle.save();

    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/news:', error);
    return NextResponse.json({ message: 'Error creating news article' }, { status: 500 });
  }
}