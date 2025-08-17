'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  videoUrl: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  image: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<News[]>([]);

  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductVideoUrl, setNewProductVideoUrl] = useState('');

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchNews();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchNews = async () => {
    const response = await fetch('/api/news');
    const data = await response.json();
    setNews(data);
  };

  const handleCreateProduct = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: newProductName, 
        description: newProductDescription, 
        image: newProductImage, 
        videoUrl: newProductVideoUrl 
      }),
    });
    setNewProductName('');
    setNewProductDescription('');
    setNewProductImage('');
    setNewProductVideoUrl('');
    fetchProducts();
  };

  const handleCreateNews = async () => {
    await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: newNewsTitle, 
        content: newNewsContent, 
        image: newNewsImage 
      }),
    });
    setNewNewsTitle('');
    setNewNewsContent('');
    setNewNewsImage('');
    fetchNews();
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    await fetch(`/api/products/${editingProduct.id}` , {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct),
    });
    setEditingProduct(null);
    fetchProducts();
  };

  const handleUpdateNews = async () => {
    if (!editingNews) return;
    await fetch(`/api/news/${editingNews.id}` , {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingNews),
    });
    setEditingNews(null);
    fetchNews();
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}` , {
      method: 'DELETE',
    });
    fetchProducts();
  };

  const handleDeleteNews = async (id: string) => {
    await fetch(`/api/news/${id}` , {
      method: 'DELETE',
    });
    fetchNews();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Add New Product</h3>
                <Input
                  placeholder="Product Name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Product Description"
                  value={newProductDescription}
                  onChange={(e) => setNewProductDescription(e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Image URL"
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Video URL"
                  value={newProductVideoUrl}
                  onChange={(e) => setNewProductVideoUrl(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleCreateProduct}>Add Product</Button>
              </div>
              <div>
                <h3 className="font-semibold">Existing Products</h3>
                <ul className="space-y-2">
                  {products.map((product) => (
                    <li key={product.id} className="flex justify-between items-center">
                      <span>{product.name}</span>
                      <div className="space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setEditingProduct(product)}>Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            {editingProduct && (
                              <div className="space-y-4">
                                <Input
                                  value={editingProduct.name}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                />
                                <Textarea
                                  value={editingProduct.description}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                />
                                <Input
                                  placeholder="Image URL"
                                  value={editingProduct.image}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                />
                                <Input
                                  placeholder="Video URL"
                                  value={editingProduct.videoUrl}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, videoUrl: e.target.value })}
                                />
                                <DialogClose asChild>
                                   <Button onClick={() => handleUpdateProduct()}>Save</Button>
                                </DialogClose>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Add New News</h3>
                <Input
                  placeholder="News Title"
                  value={newNewsTitle}
                  onChange={(e) => setNewNewsTitle(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="News Content"
                  value={newNewsContent}
                  onChange={(e) => setNewNewsContent(e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Image URL"
                  value={newNewsImage}
                  onChange={(e) => setNewNewsImage(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleCreateNews}>Add News</Button>
              </div>
              <div>
                <h3 className="font-semibold">Existing News</h3>
                <ul className="space-y-2">
                  {news.map((newsItem) => (
                    <li key={newsItem.id} className="flex justify-between items-center">
                      <span>{newsItem.title}</span>
                      <div className="space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setEditingNews(newsItem)}>Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit News</DialogTitle>
                            </DialogHeader>
                            {editingNews && (
                              <div className="space-y-4">
                                <Input
                                  value={editingNews.title}
                                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                                />
                                <Textarea
                                  value={editingNews.content}
                                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                                />
                                <Input
                                  placeholder="Image URL"
                                  value={editingNews.image}
                                  onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                                />
                                <DialogClose asChild>
                                  <Button onClick={() => handleUpdateNews()}>Save</Button>
                                </DialogClose>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" onClick={() => handleDeleteNews(newsItem.id)}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
