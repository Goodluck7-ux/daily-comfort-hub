import { Hero } from "@/components/home/hero";
import { CategoryRow } from "@/components/home/category-row";
import { PersonalShoppingBanner } from "@/components/home/personal-shopping-banner";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CollectionBanner } from "@/components/home/collection-banner";
import { TrustRow } from "@/components/home/trust-row";
export default function HomePage() { 
    return <main className="mx-auto max-w-6xl px-4 py-4 md:px-6 md:py-6"><Hero /><CategoryRow /><FeaturedProducts /><PersonalShoppingBanner /><CollectionBanner /><TrustRow /></main>; }
