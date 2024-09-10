import { notFound } from 'next/navigation';
import swell from '@/lib/swell';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { parse, HTMLElement } from 'node-html-parser';

interface Product {
  slug: string;
  images: Image[];
  url: string;
  price: string;
  orig_price?: string;
  id: string;
  name: string;
  currency: string;
  description: string;
}

interface Image {
  file: {
    url: string;
    width?: number;
    height?: number;
  };
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const response = await swell.get<Product>(`/products/${slug}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.name} | Pype AI`,
    description: "Pype unifies product data, offering AI-driven insights, predictive analytics, and real-time monitoring. Boost decision-making with 24/7 intelligent assistance.",
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  if (!product) {
    return notFound();
  }

  const root = parse(product.description);

  function removeStyles(node: HTMLElement) {
    node.removeAttribute('style');
    node.childNodes.forEach(child => {
      if (child.nodeType === 1) { // Element node
        removeStyles(child as HTMLElement);
      }
    });
  }

  root.querySelectorAll('style').forEach(style => style.remove());
  removeStyles(root);

  const content = root.toString();

  return (
    <div className="min-h-screen container-2xl mx-auto py-6 md:px-2 lg:px-2 xl:px-14 bg-white dark:bg-[#18181a] text-black dark:text-white">
      <div className="w-full">
        <div className="flex flex-wrap">
          <div className="w-full md:w-52 bg-gray-700 hover:bg-gray-600 text-center text-[14px] py-1.5 rounded-[10px] transition-all duration-300 ease-in-out dark:border-white dark:border">
            <Link href="/products" className="flex flex-wrap items-center justify-center" prefetch>
              <ArrowLeft className="text-white" /> <span className="text-white font-medium">&nbsp; Back To Products</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap pt-24">
        <div className="w-full md:w-1/3 overflow-hidden">
          <div className="flex flex-wrap">
            <Image
              src={product.images[0]?.file.url || '/placeholder-image.png'}
              alt={product.name}
              width={500}
              height={250}
              className="overflow-hidden object-contain hover:scale-105 transition-all duration-300 ease-in-out"
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 ml-0 px-6 mt-4 md:mt-0 font-afacad">
          <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
          <div
            className="text-md text-gray-600 dark:text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p className="text-base mt-4">
            {product.orig_price && (
              <span className="font-light text-slate-700 dark:text-gray-300 text-sm">
                <s>{product.currency} {product.orig_price}</s>
              </span>
            )}
            &nbsp;
            <span className="font-medium text-2xl text-red-700 dark:text-red-700">
              {product.currency} {product.price}
            </span>
          </p>
          <br/>
          <button
            className="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" disabled>
            Sold Out
          </button>
        </div>
      </div>
    </div>
  );
}
