import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const newsFilePath = path.join(process.cwd(), 'data', 'news.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    const news = JSON.parse(fileContents);
    const newsItem = news.find((n: any) => n.id === params.id);
    if (newsItem) {
      return NextResponse.json(newsItem);
    } else {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read news data' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    let news = JSON.parse(fileContents);
    const updatedNewsItem = await request.json();
    const newsItemIndex = news.findIndex((n: any) => n.id === params.id);

    if (newsItemIndex !== -1) {
      news[newsItemIndex] = { ...news[newsItemIndex], ...updatedNewsItem };
      await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
      return NextResponse.json(news[newsItemIndex]);
    } else {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    let news = JSON.parse(fileContents);
    const newsItemIndex = news.findIndex((n: any) => n.id === params.id);

    if (newsItemIndex !== -1) {
      news.splice(newsItemIndex, 1);
      await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
      return new NextResponse(null, { status: 204 });
    } else {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news item' }, { status: 500 });
  }
}
