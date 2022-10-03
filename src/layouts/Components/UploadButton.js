import React, { useRef } from "react";
import { Button } from "reactstrap";
import * as Icon from "react-feather";

const UploadButton = ({
  id,
  name,
  isDisabled,
  onChange,
  accept = "image/*,.xls,.xlsx,.doc,.docx,.pdf,.csv",
  style = {},
}) => {
  const inputEl = useRef(null);
  const onUploadClick = (e) => {
    e.preventDefault();
    inputEl.current.click();
  };
  return (
    <>
      <input
        id={id}
        ref={inputEl}
        type="file"
        hidden
        disabled={isDisabled}
        onChange={(e) => {
          onChange(e);
          inputEl.current.value = null;
        }}
        accept={accept}
      />
      <Button
        color="primary"
        className="badge badge-sm btn-background-violet float-right mx-2"
        style={style}
        onClick={onUploadClick}
        disabled={isDisabled}
      >
        <span className="mx-3">
          <Icon.FilePlus size={18} /> {name || "Upload"}
        </span>
      </Button>
    </>
  );
};

export default UploadButton;
