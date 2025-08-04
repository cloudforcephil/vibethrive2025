import { hatProduct } from '@/lib/data';
import ProductPageClient from '@/components/ProductPageClient';

// Required for static export
export async function generateStaticParams() {
  return [
    { id: '1' },
  ];
}

export default function ProductDetailPage() {
  return <ProductPageClient product={hatProduct} />;
}
