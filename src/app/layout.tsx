import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { PwaMetadata } from "@/components/pwa-metadata";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/Footer";
import { BottomNavWrapper } from "@/components/ui/bottom-nav-wrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PwaMetadata />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* ThemeProvider keeps the UI synced with light/dark preference */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WishlistProvider>
            <div className="relative flex min-h-screen flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
              <Header />
              <main className="flex-1 pb-20 md:pb-0 safe-area-left safe-area-right">
                {children}
              </main>
              <Footer />
              <BottomNavWrapper />
            </div>
            <PwaInstallPrompt />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
