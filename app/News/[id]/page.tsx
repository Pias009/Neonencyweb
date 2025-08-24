
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Add this line to force dynamic rendering

// Define the shape of a news article
interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  videoUrl?: string;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
}

async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  // This fetch call is made on the server, so we need the full URL.
  // Replace this with your actual production URL in a .env file for production.
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news/${id}`, { cache: 'no-store' }); // no-store to ensure fresh data

  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (!data.success) {
    return null;
  }
  return data.data;
}

// Helper to get embeddable YouTube URL
function getYouTubeEmbedUrl(url: string): string | null {
    let videoId;
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else {
        return null;
    }
    return `https://www.youtube.com/embed/${videoId}`;
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = await getNewsArticle(params.id);

  if (!article) {
    notFound();
  }

  const embedUrl = article.videoUrl ? getYouTubeEmbedUrl(article.videoUrl) : null;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-4">{article.title}</h1>
        <div className="flex justify-center items-center space-x-2 mb-8">
            {article.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{tag}</span>
            ))}
        </div>

        <div className="relative w-full h-96 mb-8">
          <Image
            src={article.imagePath}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none mx-auto">
          <p>{article.content}</p>
        </div>

        {embedUrl && (
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-center mb-4">Watch Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                        src={embedUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </div>
            </div>
        )}

      </article>
    </div>
  );
}
