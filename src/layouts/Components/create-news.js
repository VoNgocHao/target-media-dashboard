import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../constant";
import API from "../api";
import { toast } from "react-toastify";

export default function CreateNews(props) {
  const { visible, onClose, onConfirm, id } = props;
  const [quill, setQuill] = useState("");

  useEffect(() => {
    if (id) {
      getNewsDetail();
    }
    setQuill("");
  }, [id]);

  const getNewsDetail = async () => {
    await API.getAPIData(`/api/get-news-detail.php?id=${id}`).then((res) => {
      if (res.success) {
        setQuill(res.data.content);
      }
    });
  };

  const handleChange = (html) => {
    setQuill(html);
  };

  const onCreateNews = async () => {
    await API.postParam("/api/news-save.php", {
      content: quill,
      created_by: 1,
      id: id,
    }).then((res) => {
      if (res.success) {
        toast.success(id ? "Update successfully!" : "Create successfully!");
        setQuill("");
        onConfirm();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Modal size="lg" isOpen={visible}>
      <ModalHeader>{id ? "Cập nhật" : "Tạo mới"} </ModalHeader>
      <ModalBody>
        <ReactQuill
          theme="snow"
          placeholder="Nội dung..."
          value={quill}
          modules={modules}
          formats={formats}
          onChange={handleChange}
        />
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
            onClick={() => onCreateNews()}
          >
            {id ? "Cập nhật" : "Đăng tin"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
