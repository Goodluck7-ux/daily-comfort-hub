import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatNaira } from "@/lib/format";
import { WishlistButton } from "@/components/product/wishlist-button";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
export function ProductCard({ product }: { product: Product }) { return <article className="animate-card-in group relative rounded-xl border border-neutral-200 bg-white p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:hover:translate-y-0"><WishlistButton productId={product.id} className="absolute right-3 top-3 z-10 !size-7 !bg-white transition-transform duration-200 hover:scale-110" /><Link href={`/products/${product.slug}`} className="block"><div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100"><Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-contain p-3 transition-transform duration-300 group-hover:scale-105" /></div><p className="mt-3 line-clamp-2 min-h-9 text-xs font-medium leading-4 md:text-sm">{product.name}</p><p className="mt-1 text-sm font-semibold">{formatNaira(product.price)}</p></Link><div className="mt-3"><AddToCartButton product={product} /></div></article>; }
