"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
export function BackButton() { const router = useRouter(); return <button type="button" onClick={() => router.back()} aria-label="Go back" className="grid size-10 place-items-center rounded-full bg-white/90 shadow-sm"><ArrowLeft className="size-5" /></button>; }
