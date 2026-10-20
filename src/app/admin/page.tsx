import { requireAdmin } from "@/lib/require-admin";
import { getDatabase } from "@/lib/db";
import { ProductManager } from "@/components/admin/product-manager";

type AdminProduct = { id: string; name: string; slug: string; price_kobo: number | string; availability: string; stock_count: number | null; images: string[] };

export default async function AdminPage() {
  const user = await requireAdmin();
  const database = getDatabase();
  const products = database ? (await database.query<AdminProduct>("select id, name, slug, price_kobo, availability, stock_count, images from public.products order by created_at desc")).rows : [];
  void user;
  return <ProductManager initialProducts={products} />;
}
