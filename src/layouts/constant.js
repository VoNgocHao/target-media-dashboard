export const status_user = [
  {
    value: "activity",
    label: "Activity",
  },
  {
    value: "inactivity",
    label: "Inactivity",
  },
];

export const select_month = [
  {
    value: "1",
    label: "Janurary",
  },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const select_target = [
  { value: "AND value < 1000", label: "< 1000$" },
  { value: "AND value >= 1000 AND value <= 2000", label: "1000$ - 2000$" },
  { value: "AND value > 2000 AND value <= 5000", label: "2001 - 5000$" },
  { value: "AND value > 5000 AND value <= 10000", label: "5001$ - 10000$" },
  { value: "AND value > 10000", label: "> 10000$" },
];

export const modules = {
  toolbar: [
    [{ header: ["", 1, 2, 3] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

export const phone = "phone";
export const password = "password";
export const description = "description";
export const url_avata = "url_avata";
export const input_edit = [password, description, url_avata];
