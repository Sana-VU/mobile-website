// Blog list page with ISR
import { Metadata } from "next";
import { getAllPosts, urlForImage, formatDate } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog - WhatMobile | Latest Mobile News, Reviews & Guides",
  description:
    "Stay updated with the latest mobile news, in-depth phone reviews, and comprehensive buying guides. Expert insights into smartphone technology and trends.",
  openGraph: {
    title: "Mobile Blog - Latest News & Reviews | WhatMobile",
    description:
      "Stay updated with the latest mobile news, in-depth phone reviews, and comprehensive buying guides.",
    type: "website",
    url: "https://whatmobile.com.pk/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Blog - Latest News & Reviews | WhatMobile",
    description:
      "Stay updated with the latest mobile news, in-depth phone reviews, and comprehensive buying guides.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Mobile Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest mobile news, in-depth phone reviews, and
          comprehensive buying guides
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.slice(0, 3).map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group block rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-300 bg-card border border-border overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={urlForImage(post.coverImage.asset)
                        .width(400)
                        .height(240)
                        .url()}
                      alt={post.coverImage.alt || post.title}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        WhatMobile
                      </span>
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {post.author?.avatar ? (
                        <Image
                          src={urlForImage(post.author.avatar.asset)
                            .width(24)
                            .height(24)
                            .url()}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span>{post.author?.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime} min</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(regularPosts.length > 0 ? regularPosts : posts).map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-300 bg-card border border-border overflow-hidden"
            >
              <div className="relative overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={urlForImage(post.coverImage.asset)
                      .width(300)
                      .height(180)
                      .url()}
                    alt={post.coverImage.alt || post.title}
                    width={300}
                    height={180}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                    <span className="text-primary/50 font-semibold">
                      WhatMobile
                    </span>
                  </div>
                )}
                {post.category && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {post.author?.avatar ? (
                      <Image
                        src={urlForImage(post.author.avatar.asset)
                          .width(20)
                          .height(20)
                          .url()}
                        alt={post.author.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                    <span>{post.author?.name}</span>
                  </div>

                  {post.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
          <p className="text-muted-foreground">
            Check back soon for the latest mobile news and reviews!
          </p>
        </div>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "WhatMobile Blog",
            description:
              "Latest mobile news, reviews, and comprehensive buying guides",
            url: "https://whatmobile.com.pk/blog",
            publisher: {
              "@type": "Organization",
              name: "WhatMobile",
            },
            blogPost: posts.slice(0, 5).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `https://whatmobile.com.pk/blog/${post.slug.current}`,
              datePublished: post.publishedAt,
              author: {
                "@type": "Person",
                name: post.author.name,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
