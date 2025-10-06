import { Inter, Sora } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true
});

export const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  preload: true
});
