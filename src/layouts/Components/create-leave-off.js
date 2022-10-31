import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import API from "../api";
import { toast } from "react-toastify";
import { isEmpty } from "../helper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import "dayjs/locale/fr";

export default function CreateLeaveOff(props) {
  const { visible, onClose, onConfirm, id } = props;
  const dateNow = new Date().toLocaleString("af-ZA");
  const [selectedType, setSelectedTypes] = useState("");
  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [types, setTypes] = useState([]);
  useEffect(() => {
    if (id) {
      getLeaveOffDetail();
    } else {
      setContent("");
      setDateFrom(dateNow);
      setDateTo(dateNow);
      setSelectedTypes("");
    }
    if (visible) {
      getLeaveOffType();
    }
  }, [visible]);

  const getLeaveOffType = async () => {
    const res = await API.getAPIData("/api/leave-off-type.php");
    if (res.success) {
      setTypes(res.data);
    }
  };

  const getLeaveOffDetail = async () => {
    await API.getAPIData(`/api/leave-off-user-detail.php?id=${id}`).then(
      (res) => {
        if (res.success) {
          const data = res.data;
          setContent(data.content);
          setDateFrom(data.off_from);
          setDateTo(data.off_to);
          setSelectedTypes(data.type);
        }
      }
    );
  };

  const validateParam = () => {
    let isValue = true;
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

    await API.postParam("/api/leave-off-user-save.php", {
      content: content,
      date_form: dateFrom,
      date_to: dateTo,
      id: id,
      type: selectedType,
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
  return (
    <Modal size="lg" isOpen={visible}>
      <ModalHeader>
        {id ? "Cập nhật thông tin ngày phép" : "Tạo đơn phép"}
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-md-2 my-2">
            <label>Loại phép: </label>
          </div>
          <div className="col-md-10 my-2">
            <div
              className={
                isError && isEmpty(selectedType)
                  ? "input-group input-group-outline border-input-error"
                  : "input-group input-group-outline"
              }
            >
              <select
                className="form-control"
                value={selectedType}
                onChange={(e) => {
                  setSelectedTypes(e.target.value);
                }}
              >
                <option value={0}>-- Chọn loại đơn --</option>
                {types.map((value, index) => {
                  return (
                    <option value={value.short_name} key={index}>
                      {value.type_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 my-2">
            <label>Ngày phép: </label>
          </div>
          <div className="col-md-10 my-2">
            <div className="row ">
              <div className={"col-sm-4"}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"fr"}
                >
                  <DatePicker
                    value={dateFrom}
                    onChange={(newValue) => {
                      const date = new Date(newValue.$d).toLocaleString(
                        "af-ZA"
                      );

                      setDateFrom(date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className={"col-sm-1"} style={{ alignSelf: "center" }}>
                to
              </div>
              <div className={"col-sm-4"}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"fr"}
                >
                  <DatePicker
                    value={dateTo}
                    onChange={(newValue) => {
                      const date = new Date(newValue.$d).toLocaleString(
                        "af-ZA"
                      );
                      setDateTo(date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 my-2">
            <label>Lý do: </label>
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
