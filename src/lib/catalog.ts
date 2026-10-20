import { getAllProducts } from "@/lib/mock-products";
import { getDatabase } from "@/lib/db";
import type { Product } from "@/types/product";

type ProductRow = {
  id: string; slug: string; name: string; category_path: string[] | null;
  summary: string; description: string; price_kobo: string | number;
  images: string[] | null; availability: Product["availability"];
  stock_count: number | null; sourcing_eta: string | null;
  colors: Product["colors"] | null; features: string[] | null;
  specs: Record<string, string> | null;
};

function mapProduct(row: ProductRow): Product {
  return { id: row.id, slug: row.slug, name: row.name, categoryPath: row.category_path ?? [], summary: row.summary, description: row.description, price: Number(row.price_kobo), images: row.images ?? [], availability: row.availability, stockCount: row.stock_count ?? undefined, sourcingEta: row.sourcing_eta ?? undefined, colors: row.colors ?? [], features: row.features ?? [], specs: row.specs ?? {} };
}

export async function getCatalogProducts(): Promise<Product[]> {
  const database = getDatabase();
  if (!database) return getAllProducts();
  try {
    const result = await database.query<ProductRow>("select id, slug, name, category_path, summary, description, price_kobo, images, availability, stock_count, sourcing_eta, colors, features, specs from public.products order by created_at desc");
    return result.rows.length ? result.rows.map(mapProduct) : getAllProducts();
  } catch { return getAllProducts(); }
}

export async function getCatalogProductBySlug(slug: string) {
  return (await getCatalogProducts()).find((product) => product.slug === slug);
}

export function getCatalogRelatedProducts(product: Product, products: Product[], limit = 3) {
  return products.filter((candidate) => candidate.id !== product.id && candidate.categoryPath[0] === product.categoryPath[0]).slice(0, limit);
}

export async function getCatalogFeaturedProducts(limit = 4) {
  const products = await getCatalogProducts();
  const featuredSlugs = ["wireless-noise-cancelling-headphones", "scented-candle", "mens-sneakers", "air-fryer"];
  const featured = featuredSlugs.flatMap((slug) => products.filter((product) => product.slug === slug));
  return (featured.length ? featured : products).slice(0, limit);
}
