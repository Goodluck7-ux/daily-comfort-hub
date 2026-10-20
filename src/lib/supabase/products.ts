import type { Product } from "@/types/product";
import { getAllProducts } from "@/lib/mock-products";
import { supabase } from "@/lib/supabase/client";

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return getAllProducts();
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error || !data?.length) return getAllProducts();
  return data.map((product) => ({ id: product.id, slug: product.slug, name: product.name, categoryPath: product.category_path, summary: product.summary, description: product.description, price: product.price_kobo, images: product.images, availability: product.availability, stockCount: product.stock_count, sourcingEta: product.sourcing_eta, colors: product.colors, features: product.features, specs: product.specs }));
}
