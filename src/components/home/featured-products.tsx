import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCatalogFeaturedProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";

export async function FeaturedProducts() {
  const products = await getCatalogFeaturedProducts();
  return <section className="animate-comfort-fade-up mt-14 md:mt-20"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#a27815]">The good stuff</p><h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Worth a closer look</h2><p className="mt-2 max-w-md text-sm text-neutral-500">A few customer favourites to start with.</p></div><Link href="/shop" className="group hidden items-center gap-1 text-sm font-semibold text-slate-900 sm:flex">See everything <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{products.map((product, index) => <div key={product.id} className={`animate-comfort-fade-up motion-delay-${Math.min(index + 1, 4)}`}><ProductCard product={product} /></div>)}</div><Link href="/shop" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 sm:hidden">See everything <ArrowUpRight className="size-4" /></Link></section>;
}
