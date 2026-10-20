import { CheckCircle2, Clock3, PackageCheck, SearchCheck } from "lucide-react";
import { PageTitle } from "@/components/storefront/ui";
import { RequestForm } from "@/components/account/request-form";

const STEPS = [{ icon: SearchCheck, title: "Send Request", text: "Tell us what you need." }, { icon: PackageCheck, title: "We Source", text: "We find the best options." }, { icon: CheckCircle2, title: "Get a Quote", text: "You approve the price." }, { icon: Clock3, title: "We Deliver", text: "Sit back and enjoy." }];

export default function PersonalShoppingPage() {
  return <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8"><PageTitle title="Personal Shopping Request" description="Can&apos;t find what you need? Tell us and we&apos;ll source it for you." /><div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"><RequestForm guest /><section className="rounded-xl bg-orange-50 p-5 md:p-7"><h2 className="text-xl font-semibold">How It Works</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">{STEPS.map(({ icon: Icon, title, text }, index) => <div key={title} className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-orange-500"><Icon className="size-5" /></span><div><p className="text-sm font-semibold">{index + 1}. {title}</p><p className="mt-1 text-xs leading-5 text-neutral-600">{text}</p></div></div>)}</div><p className="mt-8 text-xs leading-5 text-neutral-600">No account? No problem. We only need your email and phone number so we can reach you with options.</p></section></div></main>;
}
