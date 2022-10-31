import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../constant";
import API from "../api";
import { toast } from "react-toastify";
import { isEmpty } from "../helper";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/fr";

export default function CreateSubNews(props) {
  const { visible, onClose, onConfirm, id } = props;
  const dateNow = new Date().toLocaleString("af-ZA");
  const [quill, setQuill] = useState("");
  const [title, setTitle] = useState("");
  const [hideAt, setHideAt] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) {
      getNewsDetail();
    } else {
      setQuill("");
      setTitle("");
      setHideAt(dateNow);
    }
  }, [id]);

  const getNewsDetail = async () => {
    await API.getAPIData(`/api/get-sub-news.php?id=${id}`).then((res) => {
      if (res.success) {
        const data = res.data;
        setQuill(data.content);
        setTitle(data.title);
        setHideAt(data.show_at);
      }
    });
  };

  const handleChange = (html) => {
    setQuill(html);
  };

  const onCreateNews = async () => {
    setIsError(false);
    if (isEmpty(title) || isEmpty(hideAt) || isEmpty(quill)) {
      setIsError(true);
      toast.error("Bạn chưa hoàn tất thông tin. Vui lòng kiểm tra lại!");
      return false;
    }
    await API.postParam("/api/sub-news-save.php", {
      content: quill,
      id: id,
      title: title,
      hide_at: hideAt,
    }).then((res) => {
      if (res.success) {
        toast.success(id ? "Update successfully!" : "Create successfully!");
        setQuill("");
        setHideAt("");
        setTitle("");
        onConfirm();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Modal size="lg" isOpen={visible}>
      <ModalHeader>{id ? "Cập nhật bản tin" : "Tạo mới bản tin"} </ModalHeader>
      <ModalBody>
        <div className="row my-2">
          <div className="col-md-12 mb-md-0 mb-4">
            <label>Tiêu đề: </label>
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
                maxLength="200"
              />
            </div>
          </div>
          <div className="col-md-12 mb-md-0 mb-4">
            <label>Ngày ẩn tin: </label>
            <div
              className={
                isError && isEmpty(hideAt)
                  ? "input-group input-group-outline border-input-error"
                  : "input-group input-group-outline"
              }
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"fr"}
              >
                <DatePicker
                  value={hideAt || ""}
                  onChange={(newValue) => {
                    const date = new Date(newValue.$d).toLocaleString("af-ZA");
                    setHideAt(date);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} type="date" />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-md-0 mb-4">
          <label>Nội dung: </label>
          <div
            className={isError && isEmpty(quill) ? "border-input-error" : ""}
          >
            <ReactQuill
              theme="snow"
              placeholder="Nội dung..."
              value={quill}
              modules={modules}
              formats={formats}
              onChange={handleChange}
            />
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
