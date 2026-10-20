import { ShopCatalog } from "@/components/shop/shop-catalog";
import { getCatalogProducts } from "@/lib/catalog";

export default async function ShopPage() {
  return <ShopCatalog products={await getCatalogProducts()} />;
}
