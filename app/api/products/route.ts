import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const fileContents = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    const newProduct = await request.json();
    newProduct.id = (products.length + 1).toString();
    products.push(newProduct);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
