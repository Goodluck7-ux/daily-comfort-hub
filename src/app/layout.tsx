import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Comfort Hub | Useful finds, made easy",
  description: "Shop useful finds for life in Nigeria, or let Comfort Hub help you source what is missing.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-white text-neutral-900 antialiased"><Providers>{children}</Providers></body></html>;
}
