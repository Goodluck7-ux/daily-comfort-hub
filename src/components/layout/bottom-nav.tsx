"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PackageSearch, Store, User } from "lucide-react";
const ITEMS = [{ href: "/", label: "Home", icon: Home }, { href: "/shop", label: "Shop", icon: Store }, { href: "/personal-shopping", label: "Request", icon: PackageSearch }, { href: "/account", label: "Account", icon: User }];
export function BottomNav() { const pathname = usePathname(); const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href); return <nav className="animate-comfort-slide-up fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t bg-white/95 shadow-[0_-4px_18px_rgba(0,0,0,0.06)] backdrop-blur md:hidden">{ITEMS.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex flex-col items-center gap-1 py-2.5 text-xs transition duration-200 ${isActive(href) ? "font-semibold text-black" : "text-neutral-400 hover:text-neutral-700"}`}><Icon className="size-5 transition-transform duration-200 hover:-translate-y-0.5" />{label}</Link>)}</nav>; }
