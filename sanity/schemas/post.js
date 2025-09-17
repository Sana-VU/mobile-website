// Post schema for Sanity
const post = {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "Brief description for SEO and previews",
      rows: 3,
    },
    {
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Important for SEO and accessibility",
        },
      ],
    },
    {
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      title: "Author",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Reviews", value: "reviews" },
          { title: "Comparisons", value: "comparisons" },
          { title: "Tips", value: "tips" },
          { title: "Features", value: "features" },
        ],
      },
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "phoneRef",
      type: "reference",
      to: [{ type: "phone" }],
      title: "Related Phone (Optional)",
      description: "Link to a phone if this post is a review or comparison",
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "featured",
      type: "boolean",
      title: "Featured Post",
      description: "Mark as featured to highlight on homepage",
      initialValue: false,
    },
    {
      name: "seo",
      type: "object",
      title: "SEO Settings",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "Meta Title",
          description: "Override the title for search engines",
        },
        {
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          description: "Brief description for search results",
          rows: 2,
        },
      ],
    },
    {
      name: "body",
      type: "portableText",
      title: "Body",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      category: "category",
    },
    prepare({ title, author, media, category }) {
      return {
        title,
        subtitle: `by ${author} ${category ? `• ${category}` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
};

export default post;
