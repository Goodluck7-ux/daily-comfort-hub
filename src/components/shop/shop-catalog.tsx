"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { PageTitle } from "@/components/storefront/ui";
import type { Product } from "@/types/product";

const CATEGORIES = ["All products", "Bags", "Unisex wear", "Cosmetics", "Home & living", "Kitchen", "Accessories"];

export function ShopCatalog({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim().toLowerCase() || "";
  const categoryParam = searchParams.get("category")?.replaceAll("-", " ").toLowerCase() || "";
  const initialCategory = CATEGORIES.find((item) => item.toLowerCase() === categoryParam) || "All products";
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const visibleProducts = useMemo(() => {
    const byCategory = category === "All products" ? products : products.filter((product) => product.categoryPath.some((value) => value.toLowerCase() === category.toLowerCase() || value.toLowerCase().includes(category.toLowerCase())));
    const filtered = search ? byCategory.filter((product) => [product.name, product.summary, ...product.categoryPath].join(" ").toLowerCase().includes(search)) : byCategory;
    return [...filtered].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : 0);
  }, [category, products, search, sort]);
  return <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
    <PageTitle title={search ? `Results for “${searchParams.get("search")}"` : "Find your next good thing"} description="Browse useful pieces for your home, wardrobe, beauty shelf, and kitchen." />
    <div className="mb-8 flex flex-wrap gap-2">{CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm transition ${category === item ? "border-black bg-black text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-black"}`}>{item}</button>)}</div>
    <div className="mb-5 flex items-center justify-between border-y border-neutral-100 py-3 text-sm text-neutral-500"><span>{visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"}</span><div className="flex items-center gap-2"><button type="button" onClick={() => setMobileFilters(true)} className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 md:hidden"><SlidersHorizontal className="size-4" /> Filters</button><label className="hidden items-center gap-2 md:flex">Sort by <span className="relative"><select value={sort} onChange={(event) => setSort(event.target.value)} className="appearance-none rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-8 text-sm text-black outline-none"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-neutral-400" /></span></label></div></div>
    {visibleProducts.length ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{visibleProducts.map((product, index) => <div key={product.id} className={`animate-comfort-fade-up motion-delay-${Math.min(index % 4 + 1, 4)}`}><ProductCard product={product} /></div>)}</div> : <div className="rounded-2xl border border-dashed p-12 text-center"><p className="font-medium">Nothing here yet</p><p className="mt-1 text-sm text-neutral-500">Try another category or send us a personal shopping request.</p></div>}
    {mobileFilters && <div className="fixed inset-0 z-50 bg-black/30 md:hidden" onClick={() => setMobileFilters(false)}><div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-5" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><h2 className="font-semibold">Sort products</h2><button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters"><X className="size-5" /></button></div><div className="space-y-2">{[["featured", "Featured"], ["price-low", "Price: low to high"], ["price-high", "Price: high to low"]].map(([value, label]) => <button key={value} type="button" onClick={() => { setSort(value); setMobileFilters(false); }} className={`block w-full rounded-xl border p-3 text-left text-sm ${sort === value ? "border-black bg-neutral-50 font-medium" : "border-neutral-200"}`}>{label}</button>)}</div></div></div>}
  </main>;
}
