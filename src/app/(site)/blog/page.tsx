// Blog list page with ISR
import { Metadata } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog - WhatMobile",
  description: "Latest mobile news, reviews, and guides.",
};

async function getPosts() {
  return await sanityClient.fetch(groq`*[_type == "post"] | order(_createdAt desc)[0...20]{
    _id, title, slug, coverImage, author->{name, avatar}, tags
  }`);
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="block rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow bg-card border border-border p-4"
          >
            {post.coverImage && (
              <img
                src={post.coverImage.asset.url}
                alt={post.title}
                className="rounded-xl mb-3 w-full h-40 object-cover"
              />
            )}
            <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted mb-2">
              {post.author?.avatar && (
                <img
                  src={post.author.avatar.asset.url}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{post.author?.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
