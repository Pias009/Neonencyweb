import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const jsonDirectory = path.join(process.cwd(), 'data');
const newsFilePath = path.join(jsonDirectory, 'news.json');

async function readNewsFile() {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeNewsFile(data) {
  await fs.writeFile(newsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET a single article by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const newsData = await readNewsFile();
    const article = newsData.find((a) => a.id === params.id);
    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error(`Error in GET /api/news/[id]:`, error);
    return NextResponse.json({ message: 'Error fetching article' }, { status: 500 });
  }
}

// PUT (update) an article by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const newsData = await readNewsFile();
    const articleIndex = newsData.findIndex((a) => a.id === params.id);

    if (articleIndex === -1) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    const existingArticle = newsData[articleIndex];

    const updatedArticle = { ...existingArticle };

    for (const [key, value] of formData.entries()) {
        if(key === 'tags') {
            updatedArticle[key] = value.split(',');
        } else if (key === 'isFeatured') {
            updatedArticle[key] = value === 'true';
        } else if (value) {
            updatedArticle[key] = value;
        }
    }

    newsData[articleIndex] = updatedArticle;
    await writeNewsFile(newsData);

    return NextResponse.json({ success: true, data: updatedArticle });
  } catch (error) {
    console.error(`Error in PUT /api/news/[id]:`, error);
    return NextResponse.json({ message: 'Error updating article' }, { status: 500 });
  }
}


// DELETE an article by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const newsData = await readNewsFile();
    const filteredData = newsData.filter((a) => a.id !== params.id);

    if (newsData.length === filteredData.length) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    await writeNewsFile(filteredData);

    return NextResponse.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    console.error(`Error in DELETE /api/news/[id]:`, error);
    return NextResponse.json({ message: 'Error deleting article' }, { status: 500 });
  }
}