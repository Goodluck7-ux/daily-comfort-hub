import Link from "next/link";
import Image from "next/image";
import { Heart, Search, ShoppingBag } from "lucide-react";

const SHOP_LINKS = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?category=home-living", label: "Home & Living" },
  { href: "/shop?category=electronics", label: "Electronics" },
  { href: "/shop?category=fashion", label: "Fashion" },
];

const SUPPORT_LINKS = [
  { href: "/personal-shopping", label: "Personal Shopping" },
  { href: "/about", label: "About Us" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account", label: "My Account" },
];

export function SiteFooter() {
  return (
    <footer className="animate-comfort-fade-up mt-12 border-t bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-xl transition hover:opacity-90">
            <span className="grid size-11 shrink-0 overflow-hidden rounded-full bg-black ring-1 ring-[#d9ad3d]/60"><Image src="/brand/comfort-hub-logo.jpeg" alt="Comfort Hub" width={80} height={80} className="h-full w-full scale-[2.3] object-cover object-[50%_35%]" /></span>
            <span><span className="block text-base font-semibold tracking-tight text-white">Comfort Hub</span><span className="mt-1 block text-[9px] uppercase tracking-[.18em] text-[#d9ad3d]">Your everyday personal shopper</span></span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
            Useful products, honest descriptions, and a personal shopper when the right thing is hard to find.
          </p>
          <div className="mt-5 flex gap-3 text-slate-300">
            <a href="#" aria-label="Social updates"><Heart className="size-4" /></a>
            <a href="#" aria-label="Search the site"><Search className="size-4" /></a>
            <a href="#" aria-label="Shopping"><ShoppingBag className="size-4" /></a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Shop</h2>
          <nav className="mt-4 space-y-3 text-sm text-slate-300">
            {SHOP_LINKS.map((item) => <Link key={item.label} href={item.href} className="block hover:text-white">{item.label}</Link>)}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Company</h2>
          <nav className="mt-4 space-y-3 text-sm text-slate-300">
            {SUPPORT_LINKS.map((item) => <Link key={item.label} href={item.href} className="block hover:text-white">{item.label}</Link>)}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Need help?</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">Our team is here to help with product questions and sourcing requests.</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><Search className="size-4 text-orange-400" /> hello@dailycomforthub.com</p>
            <p className="flex items-center gap-2"><Heart className="size-4 text-orange-400" /> +234 801 234 5678</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 Daily Comfort Hub. All rights reserved.</p>
          <p>Secure payments · Trusted sourcing · Everyday comfort</p>
        </div>
      </div>
    </footer>
  );
}
