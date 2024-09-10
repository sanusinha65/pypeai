export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from 'next';
import swell from '@/lib/swell';
import ProductCard from '@/components/ProductCard';
import ErrorBoundary from './error';

interface Product {
  slug: string;
  images: Image[];
  url: string;
  price: string;
  orig_price?: string;
  id: string;
  name: string;
  currency: string;
}

interface Image {
  file: {
    url: string;
    width?: number;
    height?: number;
  };
}

export const metadata: Metadata = {
  title: 'Products | Pype AI',
  description: 'Pype unifies product data, offering AI-driven insights, predictive analytics, and real-time monitoring. Boost decision-making with 24/7 intelligent assistance.',
};

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await swell.get<{ results: Product[] }>('/products', { limit: 10 });
    return response.results;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    return [];
  }
};

const ProductsPage = async () => {
  const products = await fetchProducts();

  if (products.length === 0) return <ErrorBoundary />;

  return (
    <div className="min-h-screen container-2xl mx-auto py-6 md:px-2 lg:px-2 xl:px-14 bg-white dark:bg-[#18181a] text-black dark:text-white">
      <h1 className="text-[40px] font-bold mb-6 text-center font-afacad">Our Products</h1>
      <div className="w-full mx-auto">
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 px-4">
              <ProductCard
                title={product.name}
                imageSrc={product.images[0]?.file.url || '/placeholder-image.png'}
                imageAlt={product.name}
                width={product.images[0]?.file.width || 200}
                height={product.images[0]?.file.height || 200}
                currency={product.currency}
                basePrice={product.orig_price}
                actualPrice={product.price}
                linkUrl={`/products/${product.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;