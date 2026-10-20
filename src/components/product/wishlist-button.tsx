"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
export function WishlistButton({ productId, className = "" }: { productId?: string; className?: string }) { const [saved, setSaved] = useState(false); function toggle() { const current = JSON.parse(window.localStorage.getItem("comfort-hub-wishlist") || "[]") as string[]; const next = saved ? current.filter((id) => id !== productId) : [...new Set([...current, productId].filter(Boolean))]; window.localStorage.setItem("comfort-hub-wishlist", JSON.stringify(next)); setSaved(!saved); toast(saved ? "Removed from wishlist" : "Saved to wishlist"); } return <button type="button" aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} onClick={toggle} className={`grid size-10 place-items-center rounded-full bg-white/90 shadow-sm ${className}`}><Heart className={`size-5 ${saved ? "fill-[#d9ad3d] text-[#a27815]" : "text-neutral-700"}`} /></button>; }
