import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import API from "../api";
import { toast } from "react-toastify";

export default function ReadNotification(props) {
  const { visible, onClose, onConfirm, id } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [idNotifi, setIdNotifi] = useState("");

  useEffect(() => {
    if (id) {
      getNotification();
    }
  }, [visible]);

  const getNotification = async () => {
    await API.getAPIData(`/api/get-notification-detail.php?id=${id}`).then(
      (res) => {
        if (res.success) {
          const data = res.data;
          setContent(data.content);
          setTitle(data.title);
          setIdNotifi(data.id);
        }
      }
    );
  };
  const onCreateNotification = async () => {
    await API.postParam("/api/notification-read.php", {
      id: idNotifi,
    }).then((res) => {
      if (res.success) {
        toast.success("Update successfully!");
        setContent("");
        onConfirm();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Modal size="lg" isOpen={visible}>
      <ModalHeader>Detail notification</ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-2 my-2">
            <label>Title: </label>
          </div>
          <div className="col-md-10 my-2">
            <div className={"input-group input-group-outline"}>
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
            <label>Content: </label>
          </div>
          <div className="col-md-10 my-2">
            <div className={"input-group input-group-outline"}>
              <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
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
            Cancel
          </button>
          <Button
            className="bg-gradient-primary"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => onCreateNotification()}
          >
            Read
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
