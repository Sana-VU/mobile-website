import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/import", label: "Import" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <nav className="border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <Link href="/admin" className="font-heading text-lg">Admin</Link>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-slate-900 dark:hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto text-xs text-slate-400">{session.user?.email}</div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
