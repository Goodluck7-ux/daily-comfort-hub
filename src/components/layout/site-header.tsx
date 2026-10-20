"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, Truck, User, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/personal-shopping", label: "Personal Shopping" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  function submitSearch(event: FormEvent) { event.preventDefault(); const value = query.trim(); if (value) router.push(`/shop?search=${encodeURIComponent(value)}`); setSearchOpen(false); }
  if (pathname.startsWith("/account")) return null;
  return (
    <>
      <div className="bg-[#f5f5f4] text-xs font-bold tracking-[0.01em] text-neutral-900 md:text-[13px]">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center md:px-6">
          <Truck className="size-3.5 text-[#a27815]" /> <span className="font-bold">Free shipping on orders over ₦100,000</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0b0b] text-white shadow-lg shadow-black/10">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-3 py-3 md:px-6 md:py-4">
          <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)} className="text-white/80 transition hover:text-[#f0c85c] md:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
          <Link href="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-semibold md:static md:translate-x-0">
            <span className="grid size-8 overflow-hidden rounded-full bg-black ring-1 ring-[#d9ad3d]/60 md:size-9"><Image src="/brand/comfort-hub-logo.jpeg" alt="Comfort Hub" width={80} height={80} className="h-full w-full scale-[2.3] object-cover object-[50%_35%]" /></span>
            <span className="hidden leading-none md:block"><span className="block tracking-tight">Comfort Hub</span><span className="mt-1 block text-[9px] font-normal uppercase tracking-[.18em] text-[#a27815]">Your everyday personal shopper</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {NAV.map((item) => <Link key={item.href} href={item.href} data-active={active(item.href)} className="nav-link text-white/75 transition hover:text-[#f0c85c]">{item.label}</Link>)}
            <div className="group relative" onMouseEnter={(event) => event.currentTarget.dataset.open = "true"} onMouseLeave={(event) => delete event.currentTarget.dataset.open}>
              <button type="button" className="flex cursor-pointer items-center text-white/75 transition hover:text-[#f0c85c] focus:text-[#f0c85c]">Categories</button>
              <div className="pointer-events-none invisible absolute left-1/2 top-8 z-20 grid w-64 -translate-x-1/2 translate-y-1 gap-1 rounded-2xl border border-white/10 bg-[#111111] p-3 opacity-0 shadow-2xl shadow-black/30 transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {["Bags", "Unisex wear", "Cosmetics", "Home & living", "Kitchen", "Accessories"].map((category) => <Link key={category} href={`/shop?category=${encodeURIComponent(category)}`} className="rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-[#d9ad3d]/15 hover:text-[#f0c85c]">{category}</Link>)}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-3 md:gap-5">
            <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="text-white/80 transition hover:text-[#f0c85c]"><Search className="size-5" /></button>
            <Link href="/account" aria-label="Account" className="hidden text-white/80 transition hover:text-[#f0c85c] md:block"><User className="size-5" /></Link>
            <Link href="/cart" aria-label="Cart" className="text-white/80 transition hover:text-[#f0c85c]"><ShoppingBag className="size-5" /></Link>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-white/10 px-4 py-3 md:hidden"><div className="space-y-1">{NAV.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`block rounded-xl px-3 py-3 text-sm transition ${active(item.href) ? "bg-[#d9ad3d]/15 text-[#f0c85c]" : "text-white/75 hover:bg-white/5 hover:text-white"}`}>{item.label}</Link>)}<Link href="/account/login" onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-[#f0c85c]">Sign in / Create account</Link><Link href="/account/wishlist" onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-[#f0c85c]">Wishlist</Link><p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#d9ad3d]">Categories</p>{["Bags", "Unisex wear", "Cosmetics", "Home & living", "Kitchen", "Accessories"].map((category) => <Link key={category} href={`/shop?category=${encodeURIComponent(category)}`} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-[#f0c85c]">{category}</Link>)}</div></nav>}
      </div>
      {searchOpen && <div className="fixed inset-0 z-50 bg-black/60 p-4 backdrop-blur-sm" onClick={() => setSearchOpen(false)}><div className="mx-auto mt-20 max-w-2xl rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between text-white"><div><p className="text-xs uppercase tracking-[.2em] text-[#d9ad3d]">Find your comfort</p><h2 className="mt-1 text-xl font-semibold">What are you looking for?</h2></div><button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X className="size-5 text-white/60" /></button></div><form onSubmit={submitSearch} className="flex gap-2"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search bags, cosmetics, kitchen items…" className="h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#d9ad3d]" /><button className="rounded-xl bg-[#d9ad3d] px-5 text-sm font-semibold text-black transition hover:bg-[#f0c85c]">Search</button></form></div></div>}
    </>
  );
}
