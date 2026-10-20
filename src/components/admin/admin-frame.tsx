import Link from "next/link";
import { BarChart3, ChevronRight, LayoutDashboard, Package, Settings, ShoppingBag, Users } from "lucide-react";

const nav = [{ label: "Overview", href: "/admin/overview", icon: LayoutDashboard }, { label: "Products", href: "/admin", icon: Package }, { label: "Orders", href: "/admin/orders", icon: ShoppingBag }, { label: "Users", href: "/admin/users", icon: Users }, { label: "Analytics", href: "/admin/analytics", icon: BarChart3 }];

export function AdminFrame({ children, active }: { children: React.ReactNode; active: string }) {
  return <div className="min-h-screen bg-[#f7f7f5] text-slate-900">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/10 bg-slate-950 px-5 py-6 text-white lg:flex"><Brand /><nav className="mt-8 space-y-1">{nav.map(({ label, href, icon: Icon }) => <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active === label ? "bg-[#d9ad3d] font-semibold text-slate-950" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}><Icon className="size-4" />{label}</Link>)}</nav><BottomLinks /></aside>
    <div className="lg:pl-64"><header className="border-b border-slate-200 bg-white px-4 py-4 md:px-8"><div className="flex items-center justify-between"><Brand compact /><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">Admin Studio</span></div><nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">{nav.map(({ label, href }) => <Link key={label} href={href} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${active === label ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"}`}>{label}</Link>)}</nav></header>{children}</div>
  </div>;
}

function Brand({ compact = false }: { compact?: boolean }) { return <div className={`flex items-center gap-3 ${compact ? "lg:hidden" : ""}`}><div className="grid size-10 place-items-center rounded-xl bg-[#d9ad3d] font-serif text-xl text-slate-950">CH</div><div><p className="font-semibold">Comfort Hub</p><p className="text-[10px] uppercase tracking-[.22em] text-[#d9ad3d]">Admin studio</p></div></div>; }
function BottomLinks() { return <div className="mt-auto border-t border-white/10 pt-5"><Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white"><Settings className="size-4" />Settings</Link><Link href="/" className="mt-2 flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white">View storefront <ChevronRight className="ml-auto size-4" /></Link></div>; }
