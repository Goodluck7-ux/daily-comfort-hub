import { PageTitle } from "@/components/storefront/ui";
import { WishlistGrid } from "@/components/account/wishlist-grid";
import { getCatalogProducts } from "@/lib/catalog";

export default async function WishlistPage() {
  return <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10"><PageTitle title="Wishlist" description="Your saved Comfort Hub finds." /><WishlistGrid products={await getCatalogProducts()} /></main>;
}
