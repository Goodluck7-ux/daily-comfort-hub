import { SiteHeader } from "@/components/layout/site-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
export default function ShopLayout({ children }: { children: React.ReactNode }) { return <><SiteHeader /><div className="pb-20 md:pb-0">{children}</div><ConditionalFooter /><BottomNav /></>; }
