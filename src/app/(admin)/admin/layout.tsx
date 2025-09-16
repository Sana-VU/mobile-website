// Admin layout gated by NextAuth
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin navigation can go here */}
      <main className="container py-8">{children}</main>
    </div>
  );
}
