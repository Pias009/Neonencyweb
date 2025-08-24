
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import News from '@/models/News';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const uploadDir = path.join(process.cwd(), '/public/uploads');

// GET a single news article by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const news = await News.findById(params.id);
    if (!news) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// PUT (update) a news article by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const existingNews = await News.findById(params.id);

    if (!existingNews) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }

    const updateData: any = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      videoUrl: formData.get('videoUrl') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      isFeatured: formData.get('isFeatured') === 'true',
    };

    const imageFile = formData.get('imagePath') as File | null;
    if (imageFile && imageFile.size > 0) {
      // Delete old image
      if (existingNews.imagePath) {
        const oldImagePath = path.join(process.cwd(), 'public', existingNews.imagePath);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error('Failed to delete old image:', err);
        }
      }
      // Save new image
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}_${imageFile.name}`;
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
      updateData.imagePath = `/uploads/${filename}`;
    }

    const updatedNews = await News.findByIdAndUpdate(params.id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedNews });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// DELETE a news article by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedNews = await News.findByIdAndDelete(params.id);
    if (!deletedNews) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }

    // Delete the associated image file
    if (deletedNews.imagePath) {
      const imagePath = path.join(process.cwd(), 'public', deletedNews.imagePath);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error('Failed to delete image file:', err);
      }
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
