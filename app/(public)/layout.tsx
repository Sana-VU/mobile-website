import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { MainSkeleton } from "@/components/MainSkeleton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <Suspense fallback={<MainSkeleton />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
