import { notFound } from "next/navigation";
import { getPost, getAllPosts, getRelatedPosts } from "@/lib/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://whatmobile.example.com";

  return {
    title: post.seo?.metaTitle || `${post.title} | WhatMobile Blog`,
    description: post.seo?.metaDescription || post.excerpt || post.title,
    keywords: post.seo?.keywords?.join(", ") || post.tags?.join(", "),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo?.ogTitle || post.title,
      description: post.seo?.ogDescription || post.excerpt || post.title,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author.name],
      url: `${baseUrl}/blog/${post.slug.current}`,
      images: post.seo?.ogImage?.asset
        ? [
            {
              url: post.seo.ogImage.asset.url,
              width: 1200,
              height: 630,
              alt: post.seo.ogImage.alt || post.title,
            },
          ]
        : post.coverImage?.asset
          ? [
              {
                url: post.coverImage.asset.url,
                width: 1200,
                height: 630,
                alt: post.coverImage.alt || post.title,
              },
            ]
          : [],
      siteName: "WhatMobile",
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.twitterTitle || post.title,
      description: post.seo?.twitterDescription || post.excerpt || post.title,
      images: post.seo?.twitterImage?.asset
        ? [post.seo.twitterImage.asset.url]
        : post.coverImage?.asset
          ? [post.coverImage.asset.url]
          : [],
      creator: post.author.social?.twitter
        ? `@${post.author.social.twitter}`
        : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug.current}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) {
        return null;
      }

      const imageUrl = urlForImage(value.asset)
        .width(800)
        .height(400)
        .format("webp")
        .quality(90)
        .url();

      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={800}
            height={400}
            className="rounded-lg shadow-md w-full"
          />
          {value.caption && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    phoneRef: ({ value }: any) => {
      if (!value?.phone) return null;

      return (
        <div className="my-6 p-4 bg-secondary rounded-lg border">
          <h4 className="font-semibold mb-2">Related Phone</h4>
          <Link
            href={`/phones/${value.phone.slug?.current || "#"}`}
            className="text-primary hover:underline"
          >
            {value.phone.name}
          </Link>
          {value.phone.brand?.name && (
            <p className="text-sm text-muted-foreground">
              by {value.phone.brand.name}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-8 mb-3 text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 leading-relaxed text-foreground/90">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-muted-foreground bg-muted/30 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <Link
        href={value.href}
        className="text-primary hover:underline font-medium"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 pl-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 pl-4">
        {children}
      </ol>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(
    post._id,
    post.category || post.tags?.[0] || ""
  );

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = Math.ceil(
    (post.body as PortableTextBlock[])
      .filter((block) => block._type === "block")
      .reduce((acc, block) => acc + (block.children?.length || 0), 0) / 200
  );

  return (
    <>
      <article className="container max-w-4xl mx-auto py-12 px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <span>›</span>
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          {post.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              {post.author.avatar?.asset && (
                <Image
                  src={urlForImage(post.author.avatar.asset)
                    .width(40)
                    .height(40)
                    .url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-foreground">
                  {post.author.name}
                </p>
                <p className="text-sm">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <time className="flex items-center gap-1">
                <span>📅</span>
                {formattedDate}
              </time>
              <span className="flex items-center gap-1">
                <span>⏱️</span>
                {readingTime} min read
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-12">
              <Image
                src={urlForImage(post.coverImage.asset)
                  .width(1200)
                  .height(600)
                  .quality(90)
                  .url()}
                alt={post.coverImage.alt || post.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-2xl shadow-xl"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              {post.author.avatar?.asset && (
                <Image
                  src={urlForImage(post.author.avatar.asset)
                    .width(64)
                    .height(64)
                    .url()}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-lg text-foreground">
                  {post.author.name}
                </p>
                <p className="text-muted-foreground">Author</p>
                {post.author.social && (
                  <div className="flex gap-3 mt-2">
                    {post.author.social.twitter && (
                      <Link
                        href={`https://twitter.com/${post.author.social.twitter}`}
                        className="text-primary hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </Link>
                    )}
                    {post.author.social.linkedin && (
                      <Link
                        href={post.author.social.linkedin}
                        className="text-primary hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="container max-w-6xl mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
            <p className="text-muted-foreground">
              Continue reading with these related posts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost._id}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
              >
                {relatedPost.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={urlForImage(relatedPost.coverImage.asset)
                        .width(400)
                        .height(225)
                        .quality(80)
                        .url()}
                      alt={relatedPost.coverImage.alt || relatedPost.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/blog/${relatedPost.slug.current}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>

                  {relatedPost.excerpt && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>
                      {new Date(relatedPost.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <span>•</span>
                    <span>{relatedPost.author.name}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || post.title,
            author: {
              "@type": "Person",
              name: post.author.name,
              ...(post.author.social?.twitter && {
                sameAs: [`https://twitter.com/${post.author.social.twitter}`],
              }),
            },
            datePublished: post.publishedAt,
            dateModified: post._updatedAt || post.publishedAt,
            image: post.coverImage?.asset
              ? urlForImage(post.coverImage.asset).width(1200).height(630).url()
              : undefined,
            publisher: {
              "@type": "Organization",
              name: "WhatMobile",
              logo: {
                "@type": "ImageObject",
                url: "https://whatmobile.example.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://whatmobile.example.com/blog/${post.slug.current}`,
            },
            keywords: post.tags?.join(", "),
            wordCount: (post.body as PortableTextBlock[])
              .filter((block) => block._type === "block")
              .reduce((acc, block) => acc + (block.children?.length || 0), 0),
            timeRequired: `PT${readingTime}M`,
          }),
        }}
      />
    </>
  );
}
