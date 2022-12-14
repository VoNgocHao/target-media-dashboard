import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import API from "../api";
import {
  description,
  header_edit,
  input_edit,
  password,
  phone,
  url_avata,
} from "../constant";
import { convertBase64, isEmpty, phoneValidation } from "../helper";

export default function PopupEditText(props) {
  const { visible, onClose, onConfirm, header, type, content = "" } = props;
  const [oldPassword, setOldPassword] = useState("");
  const [newParam, setNewParam] = useState("");
  const [isError, setIsError] = useState(false);
  const [valueFalse, setValueFalse] = useState(false);

  useEffect(() => {
    setOldPassword("");
    setNewParam(content);
    setValueFalse(false);
    setIsError(false);
  }, [type, content]);

  const onValidation = () => {
    setIsError(false);
    setValueFalse(false);
    if (isEmpty(newParam)) {
      setIsError(true);
      toast.error("Giá trị không được bỏ trống!");
      return;
    }
    if (type === phone && !phoneValidation(newParam)) {
      setIsError(true);
      setValueFalse("new_param");
      toast.error("Số điện thoại không đúng!");
      return;
    }

    if (type === url_avata) {
      API.postParam("/upload-img.php", {
        field_name: type,
        image_base64: newParam,
      }).then((res) => {
        if (res.success) {
          toast.success(res.message);
          onConfirm();
        } else {
          setValueFalse(res.code);
          toast.error(res.message);
        }
      });
    } else {
      API.postParam("/api/update-profile.php", {
        field_name: type,
        new_value: newParam,
        old_value: oldPassword,
      }).then((res) => {
        if (res.success) {
          toast.success(res.message);
          onConfirm();
        } else {
          setValueFalse(res.code);
          toast.error(res.message);
        }
      });
    }
  };

  const convertImage = async (file) => {
    const base64 = await convertBase64(file);
    setNewParam(base64);
  };

  const title = header_edit.find((x) => x.value === type);
  return (
    <Modal size="md" isOpen={visible}>
      <ModalHeader>
        {header} {title ? title.label : ""}
      </ModalHeader>
      <ModalBody>
        {type === description && (
          <div
            className={
              isError
                ? "input-group input-group-outline border-input-error"
                : "input-group input-group-outline"
            }
          >
            <textarea
              type="text"
              className="form-control"
              rows="4"
              value={newParam}
              onChange={(e) => setNewParam(e.target.value)}
              placeholder="giới thiệu"
            />
          </div>
        )}
        {type === password && (
          <>
            <div
              className={
                (isError && isEmpty(oldPassword)) ||
                valueFalse === "old_password"
                  ? "input-group input-group-outline border-input-error"
                  : "input-group input-group-outline"
              }
            >
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                maxLength={40}
              />
            </div>
            <div
              className={
                isError
                  ? "input-group input-group-outline my-3 border-input-error"
                  : "input-group input-group-outline my-3"
              }
            >
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu mới"
                value={newParam}
                onChange={(e) => setNewParam(e.target.value)}
                maxLength={40}
              />
            </div>
          </>
        )}

        {!input_edit.includes(type) && (
          <div
            className={
              isError || valueFalse === "new_param"
                ? "input-group input-group-outline border-input-error"
                : "input-group input-group-outline"
            }
          >
            <input
              type="text"
              className="form-control"
              placeholder="Nhập thông tin câp nhật"
              value={newParam}
              onChange={(e) => setNewParam(e.target.value)}
            />
          </div>
        )}
        {type === url_avata && (
          <>
            <input
              type={"file"}
              accept="image/*"
              onChange={(e) => convertImage(e.target.files[0])}
            />
            <hr />
            <img src={newParam} alt="images" style={{ width: "100%" }} />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-small btn-light"
            onClick={() => {
              onClose("");
            }}
          >
            Huỷ
          </button>
          <Button
            className="bg-gradient-primary"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => onValidation()}
          >
            Cập nhật
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
