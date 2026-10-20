import { PageTitle } from "@/components/storefront/ui";
import { WishlistGrid } from "@/components/account/wishlist-grid";
import { getCatalogProducts } from "@/lib/catalog";
import { getSessionUser } from "@/lib/session-user";
import { hasAdminAccess } from "@/lib/require-admin";
import { AccountShell } from "@/components/account/account-shell";

export default async function WishlistPage() {
  const user = await getSessionUser();
  return <AccountShell name={user?.name || "Guest"} email={user?.email || ""} isAdmin={user ? await hasAdminAccess(user.email) : false} showSignOut={Boolean(user)}><main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10"><PageTitle title="Wishlist" description="Your saved Comfort Hub finds." /><WishlistGrid products={await getCatalogProducts()} /></main></AccountShell>;
}
