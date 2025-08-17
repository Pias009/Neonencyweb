import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    const product = products.find((p: any) => p.id === params.id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products data' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    let products = JSON.parse(fileContents);
    const updatedProduct = await request.json();
    const productIndex = products.findIndex((p: any) => p.id === params.id);

    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return NextResponse.json(products[productIndex]);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    let products = JSON.parse(fileContents);
    const productIndex = products.findIndex((p: any) => p.id === params.id);

    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return new NextResponse(null, { status: 204 });
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
