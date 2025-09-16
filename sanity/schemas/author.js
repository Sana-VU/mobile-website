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
    { name: "avatar", type: "image", title: "Avatar" },
    { name: "bio", type: "text", title: "Bio" },
  ],
};

export default author;
