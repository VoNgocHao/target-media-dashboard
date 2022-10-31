export const status_user = [
  {
    value: "activity",
    label: "Kích hoạt",
  },
  {
    value: "inactivity",
    label: "Tạm khoá",
  },
];

export const select_month = [
  {
    value: "1",
    label: "Tháng 1",
  },
  { label: "Tháng 2", value: "2" },
  { label: "Tháng 3", value: "3" },
  { label: "Tháng 4", value: "4" },
  { label: "Tháng 5", value: "5" },
  { label: "Tháng 6", value: "6" },
  { label: "Tháng 7", value: "7" },
  { label: "Tháng 8", value: "8" },
  { label: "Tháng 9", value: "9" },
  { label: "Tháng 10", value: "10" },
  { label: "Tháng 11", value: "11" },
  { label: "Tháng 12", value: "12" },
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
export const header_edit = [
  { value: phone, label: "số điện thoại" },
  { value: password, label: "mật khẩu" },
  { value: description, label: "giới thiệu" },
  { value: "address", label: "địa chỉ" },
  { value: url_avata, label: "ảnh đại diện" },
];
export const keyString =
  "7ab8b7f33db8ce8bbfc7589aebf03f577ab8b7f33db8ce8bbfc7589aebf03f577ab8b7f33db8ce8bbfc7589aebf03f577ab8b7f33db8ce8bbfc7589aebf03f57589aebf03f577ab8b7f33db8";
