import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogProductBySlug, getCatalogProducts, getCatalogRelatedProducts } from "@/lib/catalog";
import { BackButton } from "@/components/product/back-button";
import { WishlistButton } from "@/components/product/wishlist-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { ProductAccordion } from "@/components/product/product-accordion";
import { RelatedProducts } from "@/components/product/related-products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getCatalogProductBySlug((await params).slug);
  if (!product) return { title: "Product not found" };
  return { title: `${product.name} | Daily Comfort Hub`, description: product.summary, openGraph: { images: product.images[0] ? [product.images[0]] : [] } };
}

export async function generateStaticParams() {
  return (await getCatalogProducts()).map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: Props) {
  const product = await getCatalogProductBySlug((await params).slug);
  if (!product) notFound();
  const related = getCatalogRelatedProducts(product, await getCatalogProducts());
  const crumbs = [...product.categoryPath, product.name];
  return <main className="animate-comfort-fade-in mx-auto max-w-6xl pb-28 md:px-6 md:py-8 md:pb-12">
    <nav className="mb-6 hidden text-sm text-neutral-500 md:block"><Link href="/" className="transition-colors hover:text-black">Home</Link>{crumbs.map((crumb) => <span key={crumb}> / {crumb}</span>)}</nav>
    <div className="grid md:grid-cols-[1.05fr_0.95fr] md:gap-10"><div className="relative"><div className="absolute inset-x-0 top-0 z-10 flex justify-between p-4 md:hidden"><BackButton /><WishlistButton productId={product.id} /></div><ProductGallery images={product.images} name={product.name} /></div><div className="px-4 py-6 md:px-0 md:py-0"><PurchasePanel product={product} /><div className="mt-8"><ProductAccordion product={product} /></div></div></div>
    <RelatedProducts title={product.availability === "on_request" ? "Similar Products" : "Related Products"} products={related} />
  </main>;
}
