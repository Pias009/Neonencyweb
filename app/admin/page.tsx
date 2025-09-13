"use client";

import { useState, useEffect, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

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

export default function AdminPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Fetch all news articles
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/news`);
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch news');
      }
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : String(error), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle opening the dialog for editing or adding news
  const handleOpenDialog = (article: NewsArticle | null = null) => {
    setEditingNews(article);
    setIsDialogOpen(true);
  };

  // Handle deleting a news article
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${getBaseUrl()}/api/news/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Success", description: "News article deleted." });
        fetchNews(); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to delete article');
      }
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : String(error), variant: "destructive" });
    }
  };

  // Handle toggling the featured status
  const handleToggleFeature = async (article: NewsArticle) => {
    try {
        const formData = new FormData();
        formData.append('title', article.title);
        formData.append('content', article.content);
        formData.append('isFeatured', String(!article.isFeatured));
        formData.append('tags', article.tags.join(','));
        if(article.videoUrl) formData.append('videoUrl', article.videoUrl);

      const res = await fetch(`${getBaseUrl()}/api/news/${article._id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Success", description: `Article ${!article.isFeatured ? 'featured' : 'unfeatured'}.` });
        fetchNews();
      } else {
        throw new Error(data.error || 'Failed to update status');
      }
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : String(error), variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await fetch(`${getBaseUrl()}/api/auth/logout`, { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="container mx-auto py-10 pt-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News Management</h1>
        <div>
          <Button onClick={() => handleOpenDialog()} className="mr-4">Add New Article</Button>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading news...</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((article) => (
                <TableRow key={article._id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.tags.join(', ')}</TableCell>
                  <TableCell>{article.isFeatured ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleToggleFeature(article)}>
                      {article.isFeatured ? 'Unfeature' : 'Feature'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(article)}>Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the article.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article._id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <NewsForm
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        editingNews={editingNews}
        onFinished={fetchNews}
      />
    </div>
  );
}


// News Form Component
interface NewsFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editingNews: NewsArticle | null;
  onFinished: () => void;
}

function NewsForm({ isOpen, setIsOpen, editingNews, onFinished }: NewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const url = editingNews ? `${getBaseUrl()}/api/news/${editingNews._id}` : `${getBaseUrl()}/api/news`;
    const method = editingNews ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (res.ok) {
        toast({ title: "Success", description: `Article ${editingNews ? 'updated' : 'created'}.` });
        onFinished();
        setIsOpen(false);
      } else {
        throw new Error(data.error || 'An error occurred');
      }
    } catch (error) {
       toast({ title: "Error", description: error instanceof Error ? error.message : String(error), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{editingNews ? 'Edit Article' : 'Add New Article'}</DialogTitle>
          <DialogDescription>
            <DialogDescription>
            Fill in the details below. Click save when you&apos;re done.
          </DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" name="title" defaultValue={editingNews?.title} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">Content</Label>
            <Textarea id="content" name="content" defaultValue={editingNews?.content} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imagePath" className="text-right">Image</Label>
            <Input id="imagePath" name="imagePath" type="file" className="col-span-3" required={!editingNews} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="videoUrl" className="text-right">Video URL</Label>
            <Input id="videoUrl" name="videoUrl" defaultValue={editingNews?.videoUrl} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">Tags</Label>
            <Input id="tags" name="tags" defaultValue={editingNews?.tags.join(', ')} className="col-span-3" placeholder="e.g. tech, breaking, hot" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="isFeatured" className="text-right">Feature?</Label>
            <div className="col-span-3 flex items-center">
               <Checkbox id="isFeatured" name="isFeatured" defaultChecked={editingNews?.isFeatured} value="true" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}