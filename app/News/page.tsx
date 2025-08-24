import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic'; // Add this line to force dynamic rendering

// Define the shape of a news article
interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  tags: string[];
  createdAt: string;
}

async function getNews(): Promise<NewsArticle[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news`, { cache: 'no-store' });

  if (!res.ok) {
    // Return empty array or throw error, depending on desired behavior for errors
    console.error("Failed to fetch news");
    return [];
  }
  const data = await res.json();
  return data.data || [];
}

// Helper to format date and truncate content
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const truncate = (text: string, length: number) => text.length > length ? `${text.substring(0, length)}...` : text;

export default async function NewsPage() {
  const newsArticles = await getNews();

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <Newspaper className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold orbitron neon-text mb-4">
            SaaS Product <span className="text-pink-400">News</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest features, updates, and insights from
            our product team.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Link href={`/News/${article._id}`} key={article._id} className="block group">
              <Card
                className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={article.imagePath}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  {article.tags && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {article.tags.map(tag => (
                        <Badge key={tag} className="glass px-3 py-1 text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.createdAt)}
                  </div>
                  <h3 className="text-2xl font-bold orbitron group-hover:neon-text transition-all duration-300 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {truncate(article.content, 100)}
                  </p>
                  <div className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors mt-auto">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}