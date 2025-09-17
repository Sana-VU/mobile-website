// Author schema for Sanity
const author = {
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "avatar",
      type: "image",
      title: "Avatar",
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
      name: "bio",
      type: "text",
      title: "Bio",
      rows: 3,
    },
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.email(),
    },
    {
      name: "social",
      type: "object",
      title: "Social Links",
      fields: [
        {
          name: "twitter",
          type: "url",
          title: "Twitter",
        },
        {
          name: "linkedin",
          type: "url",
          title: "LinkedIn",
        },
        {
          name: "website",
          type: "url",
          title: "Website",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "avatar",
    },
  },
};

export default author;
