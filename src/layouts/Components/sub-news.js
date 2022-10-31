import React, { useState } from "react";
import * as Icon from "react-feather";
import parse from "html-react-parser";
import API from "../api";
import Confirm from "./confirm";
import { toast } from "react-toastify";

function SubNews({ data, reload, editSubNewID, permission_code = [] }) {
  const [isShown, setIsShown] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const onIsDeleted = () => {
    setIsDeleted(!isDeleted);
  };

  const onDeleted = async () => {
    onIsDeleted();
    await API.postParam(`/api/sub-new-deleted.php?id=${data.id}`).then(
      (res) => {
        if (res.success) {
          toast.success("Xoá Thành công");
          reload();
        } else {
          toast.error(res.messages);
        }
      }
    );
  };

  return (
    <div className="card mt-4">
      {permission_code.includes("post_sub_new_home") && (
        <div
          className="more-vertical-icon"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <Icon.MoreVertical size={14} />
          {isShown && (
            <ul className="show-option-more">
              <li onClick={() => editSubNewID(data.id)}>
                <Icon.Edit3 size={12} color={"#3498db"} />
              </li>
              <li onClick={() => onIsDeleted()}>
                <Icon.X size={12} color={"#e74c3c"} />
              </li>
            </ul>
          )}
        </div>
      )}
      <div className="card-header pb-0 p-3">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <h6 className="mb-0 txt-linear-gradient-gr text-xl">
              {data.title}
            </h6>
          </div>
        </div>
      </div>
      <div className="card-body p-3">
        <div className="row">
          <p>{parse(data.content || "")}</p>
        </div>
      </div>
      <Confirm
        visible={isDeleted}
        onClose={onIsDeleted}
        onConfirm={onDeleted}
        header={"Xoá tin"}
        title={`Bạn muốn xoá ${data.title}?`}
      />
    </div>
  );
}

export default SubNews;
