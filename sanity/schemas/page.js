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
      name: "body",
      type: "portableText",
      title: "Body",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default page;
