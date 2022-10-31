import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import API from "../api";
import { toast } from "react-toastify";
import { isEmpty } from "../helper";

export default function CreateNotification(props) {
  const { visible, onClose, onConfirm, id } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectDepart, setSelectDepart] = useState([]);

  useEffect(() => {
    getDepartment();
  }, []);
  useEffect(() => {
    if (id) {
      getNotification();
    } else {
      setTitle("");
      setContent("");
      setSelectDepart([]);
    }
  }, [visible]);

  const getNotification = async () => {
    await API.getAPIData(`/api/get-notification-detail.php?id=${id}`).then(
      (res) => {
        if (res.success) {
          const data = res.data;
          setContent(data.content);
          setTitle(data.title);
          const arrayId = data.department_ids
            ? data.department_ids.split(",")
            : [];
          setSelectDepart(arrayId);
        }
      }
    );
  };

  const getDepartment = async () => {
    let url = `/api/departments.php`;
    const res = await fetch(url).then((response) => response.json());
    if (res.success) {
      setDepartments(res.data);
    }
  };

  const validateParam = () => {
    let isValue = true;

    if (isEmpty(title)) {
      toast.error("Tiêu đề không được trống!");
      isValue = false;
    }
    if (isEmpty(content)) {
      toast.error("Nội dung không được trống!");
      isValue = false;
    }

    setIsError(!isValue);
    return isValue;
  };

  const onCreateNotification = async () => {
    if (!validateParam()) {
      return;
    }
    await API.postParam("/api/notification-save.php", {
      content: content,
      user_id: 1,
      id: id,
      title: title,
      department_ids: selectDepart,
    }).then((res) => {
      if (res.success) {
        toast.success(id ? "Cập nhật thành công!" : "Thêm mới thành công!");
        setContent("");
        onConfirm();
      } else {
        toast.error(res.message);
      }
    });
  };

  const onSelectDepartment = (id) => {
    const index = selectDepart.indexOf(id);

    if (index > -1) {
      const newSelect = selectDepart;
      newSelect.splice(index, 1);
      setSelectDepart([...newSelect]);
    } else {
      setSelectDepart([...selectDepart, id]);
    }
  };

  return (
    <Modal size="lg" isOpen={visible}>
      <ModalHeader>
        {id ? "Cập nhật thông báo" : "Tạo mới thông báo"}
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-2 my-2">
            <label>Tiêu đề: </label>
          </div>
          <div className="col-md-10 my-2">
            <div
              className={
                isError && isEmpty(title)
                  ? "input-group input-group-outline border-input-error"
                  : "input-group input-group-outline"
              }
            >
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 my-2">
            <label>Nội dung: </label>
          </div>
          <div className="col-md-10 my-2">
            <div
              className={
                isError && isEmpty(content)
                  ? "input-group input-group-outline border-input-error"
                  : "input-group input-group-outline"
              }
            >
              <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          {departments.map((value) => {
            return (
              <button
                className={
                  selectDepart.indexOf(value.id) > -1
                    ? "btn btn-small bg-gradient-primary mx-1"
                    : "btn btn-small"
                }
                key={value.id}
                onClick={() => onSelectDepartment(value.id)}
              >
                {value.department_name}
              </button>
            );
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-small btn-light"
            onClick={() => {
              onClose();
            }}
          >
            Huỷ
          </button>
          <Button
            className="bg-gradient-primary"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => onCreateNotification()}
          >
            {id ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
