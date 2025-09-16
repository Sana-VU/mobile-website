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
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
    },
    {
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      title: "Author",
    },
    { name: "tags", type: "array", title: "Tags", of: [{ type: "string" }] },
    {
      name: "body",
      type: "portableText",
      title: "Body",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default post;
