import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

export async function requireAuthenticatedUser() {
  const auth = getAuth();
  if (!auth) redirect("/account/login");
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/account/login");
  return session.user;
}
