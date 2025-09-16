// Review schema for Sanity
const review = {
  name: "review",
  type: "document",
  title: "Review",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phone",
      type: "reference",
      to: [{ type: "phone" }],
      title: "Phone",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      title: "Author",
    },
    {
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: "body",
      type: "portableText",
      title: "Body",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default review;
