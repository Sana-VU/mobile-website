import { Metadata } from "next";
import { WishlistPage } from "@/components/pages/WishlistPage";

export const metadata: Metadata = {
  title: "My Wishlist | WhatMobile",
  description:
    "Your saved phones and favorite devices. Compare and manage your wishlist on Pakistan's premier mobile marketplace.",
  keywords: [
    "wishlist",
    "saved phones",
    "mobile wishlist",
    "phone comparison",
    "Pakistan",
  ],
};

export default function Wishlist() {
  return <WishlistPage />;
}
