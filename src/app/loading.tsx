import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return <main className="grid min-h-screen place-items-center bg-[#0b0b0b]"><div className="text-center"><div className="animate-logo-pulse mx-auto grid size-20 place-items-center rounded-3xl border border-[#d9ad3d]/40 bg-[#d9ad3d]/10 text-[#f0c85c] shadow-[0_0_60px_rgba(217,173,61,.15)]"><ShoppingBag className="size-10" strokeWidth={1.5} /></div><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#d9ad3d]">Finding your comfort</p></div></main>;
}
