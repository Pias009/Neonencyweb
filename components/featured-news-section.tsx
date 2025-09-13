
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

// This is the same data fetching logic and type definition as in the other pages
interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
}

async function getNews(): Promise<NewsArticle[]> {
  const res = await fetch('/api/news', { cache: 'no-store' });
  if (!res.ok) {
    console.error("Failed to fetch news for featured section");
    return [];
  }
  const data = await res.json();
  return data.data || [];
}

const truncate = (text: string, length: number) => text.length > length ? `${text.substring(0, length)}...` : text;

export async function FeaturedNewsSection() {
  const allNews = await getNews();
  const featuredNews = allNews.filter(article => article.isFeatured);

  if (featuredNews.length === 0) {
    return null; // Don't render the section if there are no featured articles
  }

  return (
    <section className="bg-gray-900/50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold orbitron neon-text">Featured News</h2>
          <p className="text-lg text-muted-foreground mt-2">The latest updates and announcements, front and center.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredNews.map((article) => (
            <Link href={`/News/${article._id}`} key={article._id} className="block group">
              <Card className="group glass-strong hover:glass hover:neon-glow transition-all duration-500 border-2 border-white/10 hover:border-cyan-400/30 rounded-3xl overflow-hidden h-full flex flex-col">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={article.imagePath}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  {article.tags && article.tags[0] && (
                      <div className="absolute top-4 left-4">
                          <Badge className="glass px-3 py-1 text-sm">
                              {article.tags[0]}
                          </Badge>
                      </div>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold orbitron group-hover:neon-text transition-all duration-300 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {truncate(article.content, 90)}
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
    </section>
  );
}
