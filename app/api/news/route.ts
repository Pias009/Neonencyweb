import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const newsFilePath = path.join(process.cwd(), 'data', 'news.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    const news = JSON.parse(fileContents);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read news data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const fileContents = await fs.readFile(newsFilePath, 'utf8');
    const news = JSON.parse(fileContents);
    const newNewsItem = await request.json();
    newNewsItem.id = (news.length + 1).toString();
    news.push(newNewsItem);
    await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
    return NextResponse.json(newNewsItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news item' }, { status: 500 });
  }
}
