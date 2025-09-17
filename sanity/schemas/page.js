// Static page schema for Sanity
const page = {
  name: "page",
  type: "document",
  title: "Page",
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
      title: "Page Description",
      description: "Brief description for SEO and previews",
      rows: 2,
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
        },
      ],
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
      subtitle: "excerpt",
      media: "coverImage",
    },
  },
};

export default page;
