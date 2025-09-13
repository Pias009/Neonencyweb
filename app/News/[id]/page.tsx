
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
  const res = await fetch(`/api/news/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  if (data.success) {
    return data.data;
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
    <div className="pt-32 pb-16 px-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/News" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        <article className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 w-full">
            <Image
              src={article.imagePath}
              alt={article.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold orbitron neon-text mb-4 text-left">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6 text-left">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {article.tags && article.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-cyan-400 text-cyan-400 px-3 py-1 text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-lg text-gray-300 leading-relaxed text-left whitespace-pre-line">
              <p>{article.content}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
