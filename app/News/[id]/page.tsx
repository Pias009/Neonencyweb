import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  tags: string[];
  createdAt: string;
}

async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  if (data.success) {
    // The API returns `image`, but the component expects `imagePath`
    return { ...data.data, imagePath: data.data.image };
  }
  return null;
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = await getNewsArticle(params.id);

  if (!article) {
    return (
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold">Article not found</h1>
        <Link href="/News" className="mt-4 inline-flex items-center gap-2 text-cyan-400">
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/News" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold orbitron neon-text mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            {article.tags && article.tags.map(tag => (
              <Badge key={tag} className="glass px-3 py-1 text-sm">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="relative h-96 w-full rounded-3xl overflow-hidden mb-8">
          <Image
            src={article.imagePath}
            alt={article.title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
}