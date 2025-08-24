import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const jsonDirectory = path.join(process.cwd(), 'data');
const newsFilePath = path.join(jsonDirectory, 'news.json');
const uploadsDirectory = path.join(process.cwd(), 'public', 'uploads');

async function readNewsFile() {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

async function writeNewsFile(data) {
  await fs.writeFile(newsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
  try {
    const newsData = await readNewsFile();
    const transformedData = newsData.map((article) => ({
      ...article,
      _id: article.id,
      imagePath: article.image,
      tags: article.tags || [],
    }));
    return NextResponse.json({ success: true, data: transformedData });
  } catch (error) {
    console.error('Failed to read or parse news.json:', error);
    return NextResponse.json({ message: 'Error fetching news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('imagePath') as File;
    const tags = formData.get('tags') as string;

    if (!title || !content || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Handle file upload
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${Date.now()}_${imageFile.name}`;
    const imagePath = path.join(uploadsDirectory, imageName);
    await fs.writeFile(imagePath, imageBuffer);

    const newsData = await readNewsFile();
    const newArticle = {
      id: uuidv4(),
      title,
      content,
      image: `/uploads/${imageName}`,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      createdAt: new Date().toISOString(),
    };

    newsData.push(newArticle);
    await writeNewsFile(newsData);

    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/news:', error);
    return NextResponse.json({ message: 'Error creating news article' }, { status: 500 });
  }
}