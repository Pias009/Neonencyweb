import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import News from "@/models/News";

// GET a single article by ID
export async function GET(request: NextRequest, ctx: RouteContext<"/api/news/[id]">) {
  const { id } = await ctx.params; // Destructure params here
  try {
    await dbConnect();
    const article = await News.findById(id);
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error(`Error in GET /api/news/[id]:`, error);
    return NextResponse.json({ message: "Error fetching article" }, { status: 500 });
  }
}

// PUT (update) an article by ID
export async function PUT(request: NextRequest, ctx: RouteContext<"/api/news/[id]">) {
  const { id } = await ctx.params; // Destructure params here
  try {
    await dbConnect();
    const formData = await request.formData();
    const updateData: any = {};

    for (const [key, value] of Array.from(formData.entries())) {
      if (key === "tags") {
        updateData[key] = value.toString().split(",");
      } else if (key === "isFeatured") {
        updateData[key] = value === "true";
      } else if (value) {
        updateData[key] = value;
      }
    }

    const updatedArticle = await News.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedArticle) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedArticle });
  } catch (error) {
    console.error(`Error in PUT /api/news/[id]:`, error);
    return NextResponse.json({ message: "Error updating article" }, { status: 500 });
  }
}

// DELETE an article by ID
export async function DELETE(request: NextRequest, ctx: RouteContext<"/api/news/[id]">) {
  const { id } = await ctx.params; // Destructure params here
  try {
    await dbConnect();
    const deletedArticle = await News.findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.error(`Error in DELETE /api/news/[id]:`, error);
    return NextResponse.json({ message: "Error deleting article" }, { status: 500 });
  }
}
