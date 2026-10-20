"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/storefront/cart-provider";
export function Providers({ children }: { children: React.ReactNode }) { const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })); return <QueryClientProvider client={client}><CartProvider>{children}</CartProvider><Toaster position="top-right" richColors /></QueryClientProvider>; }
