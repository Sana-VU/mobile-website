// Dynamic server-side sitemap for brands, phones, blog posts
import { getServerSideSitemap } from "next-sitemap";
import { getAllBrands, getAllPhones, getAllPosts } from "@/lib/sitemap-data";

export async function getServerSideProps(ctx) {
  const brands = await getAllBrands();
  const phones = await getAllPhones();
  const posts = await getAllPosts();

  const fields = [
    ...brands.map((b) => ({
      loc: `https://whatmobile.example.com/brands/${b.slug}`,
    })),
    ...phones.map((p) => ({
      loc: `https://whatmobile.example.com/phones/${p.slug}`,
    })),
    ...posts.map((post) => ({
      loc: `https://whatmobile.example.com/blog/${post.slug}`,
    })),
  ];

  return getServerSideSitemap(ctx, fields);
}

export default function Sitemap() {}
