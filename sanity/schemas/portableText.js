// PortableText schema for rich text
const portableText = {
  name: "portableText",
  type: "array",
  title: "Portable Text",
  of: [
    { type: "block" },
    { type: "image" },
    { type: "code" },
    { type: "link" },
  ],
};

export default portableText;
