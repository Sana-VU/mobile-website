import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/types";

// Sanity configuration
export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2023-12-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_READ_TOKEN,
};

// Create Sanity client
export const sanityClient = createClient(sanityConfig);

// Image URL builder
const builder = imageUrlBuilder(sanityClient);
export const urlForImage = (source: SanityImageSource) => builder.image(source);

// Types
export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  avatar?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  bio?: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  author: Author;
  category?: string;
  tags?: string[];
  phoneRef?: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  };
  publishedAt: string;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  body: PortableTextBlock[];
  _createdAt: string;
  _updatedAt: string;
}

export interface BlogListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  coverImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  author: {
    name: string;
    avatar?: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
  };
  category?: string;
  tags?: string[];
  publishedAt: string;
  featured?: boolean;
  readingTime?: number;
}

// GROQ Queries
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset,
    alt
  },
  author-> {
    name,
    avatar {
      asset,
      alt
    }
  },
  category,
  tags,
  publishedAt,
  featured,
  "readingTime": round(length(pt::text(body)) / 5 / 60)
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset,
    alt
  },
  author-> {
    _id,
    name,
    slug,
    avatar {
      asset,
      alt
    },
    bio,
    email,
    social
  },
  category,
  tags,
  phoneRef-> {
    _id,
    name,
    slug
  },
  publishedAt,
  featured,
  seo,
  body,
  _createdAt,
  _updatedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 60)
}`;

export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset,
    alt
  },
  author-> {
    name,
    avatar {
      asset
    }
  },
  category,
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 60)
}`;

export const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && category == $category && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset,
    alt
  },
  author-> {
    name,
    avatar {
      asset
    }
  },
  category,
  tags,
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 60)
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

export const RELATED_POSTS_QUERY = `*[_type == "post" && _id != $postId && defined(slug.current) && (
  category == $category || 
  count(tags[@in $tags]) > 0 ||
  phoneRef._ref == $phoneRef
)] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset,
    alt
  },
  author-> {
    name
  },
  category,
  publishedAt,
  "readingTime": round(length(pt::text(body)) / 5 / 60)
}`;

// Helper functions
export async function getAllPosts(): Promise<BlogListItem[]> {
  return await sanityClient.fetch(POSTS_QUERY);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await sanityClient.fetch(POST_QUERY, { slug });
}

export async function getFeaturedPosts(): Promise<BlogListItem[]> {
  return await sanityClient.fetch(FEATURED_POSTS_QUERY);
}

export async function getPostsByCategory(
  category: string
): Promise<BlogListItem[]> {
  return await sanityClient.fetch(POSTS_BY_CATEGORY_QUERY, { category });
}

export async function getAllPostSlugs(): Promise<string[]> {
  return await sanityClient.fetch(POST_SLUGS_QUERY);
}

export async function getRelatedPosts(
  postId: string,
  category?: string,
  tags?: string[],
  phoneRef?: string
): Promise<BlogListItem[]> {
  return await sanityClient.fetch(RELATED_POSTS_QUERY, {
    postId,
    category,
    tags: tags || [],
    phoneRef,
  });
}

// Calculate reading time
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Extract plain text from PortableText
export function extractTextFromPortableText(
  blocks: PortableTextBlock[]
): string {
  return blocks
    .filter((block) => block._type === "block")
    .map(
      (block) =>
        block.children
          ?.filter((child) => child._type === "span")
          .map((span) => (span as { text: string }).text)
          .join("") || ""
    )
    .join(" ");
}

export default sanityClient;
