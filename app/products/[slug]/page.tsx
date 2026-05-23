import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getBrandById } from "@/data/brands";
import { products, getProductBySlug } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const brand = getBrandById(product.brandId);

  if (!brand) {
    notFound();
  }

  return <ProductDetail product={product} brand={brand} />;
}
