import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return <section className="hero-shell group relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-[#f4e8d5] md:min-h-[540px]">
    <Image src="/images/hero-v2.png" alt="Warm, comfortable living room" fill priority sizes="(max-width: 768px) 100vw, 1200px" className="hero-image object-cover transition-transform duration-1000 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#f4e8d5] via-[#f4e8d5]/80 to-[#f4e8d5]/10 md:via-[#f4e8d5]/60" />
    <div className="hero-glow absolute -right-20 top-12 size-72 rounded-full bg-[#d9ad3d]/20 blur-3xl" />
    <div className="relative flex min-h-[430px] items-end md:min-h-[540px] md:items-center"><div className="max-w-xl px-5 pb-10 md:px-12 md:pb-0">
      <p className="animate-comfort-fade-up flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.28em] text-[#8a6710] md:text-xs"><Sparkles className="size-3.5" /> Curated for real life</p>
      <h1 className="animate-comfort-fade-up motion-delay-1 mt-4 max-w-lg text-[2.65rem] font-semibold leading-[.98] tracking-[-.05em] text-slate-950 md:text-6xl"><span className="block">Good things.</span><span className="block text-[#8a6710]">Made easy.</span></h1>
      <p className="animate-comfort-fade-up motion-delay-2 mt-5 max-w-md text-sm leading-6 text-slate-700 md:text-base md:leading-7">Useful finds for your home, wardrobe, and everyday routines—plus a real person to help when you cannot find the right thing.</p>
      <div className="animate-comfort-fade-up motion-delay-3 mt-7 flex flex-wrap gap-3"><Link href="/shop" className="hero-cta group/cta inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#8a6710]">Browse the collection <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" /></Link><Link href="/personal-shopping" className="inline-flex items-center gap-2 rounded-full border border-slate-950/20 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-950 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#8a6710] hover:bg-white">Tell us what to find</Link></div>
    </div></div>
  </section>;
}
