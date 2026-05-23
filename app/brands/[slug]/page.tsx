import { notFound } from "next/navigation";
import ProductListingPage from "@/components/product/ProductListingPage";
import { brands, getBrandBySlug } from "@/data/brands";
import { getProductsByBrandSlug } from "@/lib/filters";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return <ProductListingPage title={brand.name} products={getProductsByBrandSlug(slug)} />;
}
