import type { ReactNode } from "react";

type FieldProps = { label: string; name?: string; required?: boolean; placeholder?: string; type?: string };

export function Field({ label, name, required = false, placeholder, type = "text" }: FieldProps) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-neutral-700">{label}{required && <span className="text-red-500"> *</span>}</span><input name={name} type={type} required={required} placeholder={placeholder} className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none transition-shadow placeholder:text-neutral-400 focus:border-black focus:ring-2 focus:ring-orange-100" /></label>;
}

export function SelectField({ label, name, required = false, placeholder }: { label: string; name?: string; required?: boolean; placeholder: string }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-neutral-700">{label}{required && <span className="text-red-500"> *</span>}</span><select name={name} required={required} defaultValue="" className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-500 outline-none transition-shadow focus:border-black focus:ring-2 focus:ring-orange-100"><option value="" disabled>{placeholder}</option><option>Lagos</option><option>Abuja</option><option>Rivers</option><option>Oyo</option><option>Enugu</option><option>Kaduna</option></select></label>;
}

export function TextAreaField({ label, name, placeholder }: { label: string; name?: string; placeholder?: string }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-neutral-700">{label}</span><textarea name={name} placeholder={placeholder} className="min-h-24 w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm outline-none transition-shadow placeholder:text-neutral-400 focus:border-black focus:ring-2 focus:ring-orange-100" /></label>;
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold tracking-tight ${className}`}>{children}</h2>;
}

export function PageTitle({ title, description }: { title: string; description?: string }) {
  return <div className="animate-comfort-fade-up mb-6"><h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>{description && <p className="mt-2 text-sm text-neutral-500">{description}</p>}</div>;
}
