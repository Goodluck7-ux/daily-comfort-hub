import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
export function RelatedProducts({ title, products }: { title: string; products: Product[] }) { if (!products.length) return null; return <section className="mt-12 px-4 md:px-0"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">{title}</h2><Link href="/shop" className="text-sm font-medium text-blue-600">View All →</Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>; }
