// Phone schema for Sanity (for review reference)
const phone = {
  name: "phone",
  type: "document",
  title: "Phone",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    { name: "brand", type: "string", title: "Brand" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default phone;
