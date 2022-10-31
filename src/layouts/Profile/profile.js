import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import PopupEditText from "../Components/popup-edit-text";
import { toast } from "react-toastify";
import API from "../api";
import { convertDMY, convertYMD } from "../helper";
import ImgUserDefault from "../../img/user-pase.jpeg";
import Loading from "../Components/loading";
import Documents from "../Components/documents";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import CreateLeaveOff from "../Components/create-leave-off";
import Confirm from "../Components/confirm";
import "dayjs/locale/fr";

function Profile() {
  const dateNow = new Date();
  const [openEditText, setOpenEditText] = useState(false);
  const [editType, setEditType] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [leaveOffs, setLeaveOffs] = useState([]);
  const [isLeaveOffs, setIsLeaveOffs] = useState(false);
  const [leaveOffID, setLeaveOffID] = useState("");
  const [selectYear, setSelectYear] = useState(dateNow);
  const [leaveOffIDDel, setLeaveOffIDDel] = useState("");
  const [isLeaveOffDel, setIsLeaveOffDel] = useState(false);
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    birth_date: "",
    department_id: "",
    url_avata: "",
    working_date: "",
    position_id: "",
    department_name: "",
    position_name: "",
    month: "",
    value: "",
  });

  const onOpenEditText = (type, content) => {
    setEditType(type);
    setContentEdit(content);
    setOpenEditText(!openEditText);
  };

  useEffect(() => {
    setIsLoading(true);
    getProfile();
    setIsLoading(false);
    getLeaveOffs(selectYear.getFullYear());
  }, []);

  const getProfile = async () => {
    await API.getAPIData("/api/get-profile.php").then((res) => {
      if (res.success) {
        const data = res.data;
        setUser(data);
        getDocument(data.id);
      } else {
        toast.error(res.message);
      }
    });
  };

  const getDocument = async (id) => {
    await API.getAPIData(`/api/user-document.php?id=${id}`).then((res) => {
      if (res.success) {
        setDocuments(res.data);
      } else {
        toast.error(res.message);
      }
    });
  };

  const getLeaveOffs = async (year) => {
    let url = `/api/leave-off-user.php?year=${year}`;
    const res = await API.getAPIData(url);

    if (res.success) {
      setLeaveOffs(res.data);
    } else {
      setLeaveOffs([]);
    }
  };

  const onSuccessEdit = async () => {
    setIsLoading(true);
    getProfile();
    onOpenEditText();
    setIsLoading(false);
  };

  const image = user.url_avata
    ? "/api/images/" + user.url_avata
    : ImgUserDefault;

  const onLeaveOff = (id) => {
    setLeaveOffID(id);
    setIsLeaveOffs(!isLeaveOffs);
  };

  const onConfirmLeaveOff = () => {
    onLeaveOff();
    getLeaveOffs(selectYear.getFullYear());
  };

  const onConfirmDelete = (id) => {
    setLeaveOffIDDel(id);
    setIsLeaveOffDel(!isLeaveOffDel);
  };

  const onDeleteLeaveOff = async () => {
    onConfirmDelete();
    await API.getAPIData(
      `api/leave-off-user-delete.php?id=${leaveOffIDDel}`
    ).then((req) => {
      if (req.success) {
        getLeaveOffs(selectYear.getFullYear());
        toast.success("Xoá thành công!");
      } else {
        toast.error(req.message);
      }
    });
  };
  return (
    <section>
      <PopupEditText
        visible={openEditText}
        style={{ zIndex: "10" }}
        onClose={onOpenEditText}
        header={"Cập nhật "}
        type={editType}
        content={contentEdit}
        onConfirm={onSuccessEdit}
      />
      {isLoading && <Loading />}
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Thông tin cá nhân" />
        <div className="container-fluid px-2 px-md-4">
          <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <div className="card card-body mx-3 mx-md-4 mt-n6">
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src={image}
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
                <span
                  className="cursor-pointer"
                  style={{ top: "4px", position: "absolute" }}
                >
                  <Icon.Edit
                    size={15}
                    onClick={() => onOpenEditText("url_avata")}
                  />
                </span>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">{user.full_name}</h5>
                  <p className="mb-0 font-weight-normal text-sm">
                    {user.department_name} / {user.position_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-12 col-xl-6">
                  <div className="card card-plain h-100">
                    <div className="card-header pb-0 p-3">
                      <div className="row">
                        <div className="col-md-8 d-flex align-items-center">
                          <h6 className="mb-0">Thông tin cá nhân</h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-3">
                      <p className="text-sm">
                        {user.description}
                        <span
                          className="p-2"
                          onClick={() =>
                            onOpenEditText("description", user.description)
                          }
                        >
                          <Icon.Edit2 size={15} />
                        </span>
                      </p>
                      <hr className="horizontal gray-light my-4" />
                      <ul className="list-group">
                        <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                          <strong className="text-dark">Họ và tên:</strong>
                          &nbsp;&nbsp;{user.full_name}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Số điện thoại:</strong>
                          &nbsp;&nbsp;{user.phone}
                          <span className="p-2">
                            <Icon.Edit2
                              size={15}
                              onClick={() =>
                                onOpenEditText("phone", user.phone)
                              }
                            />
                          </span>
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Ngày sinh:</strong>
                          &nbsp;&nbsp;{convertYMD(user.birth_date)}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Email:</strong>
                          &nbsp;&nbsp;{user.email}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Điạ chỉ:</strong>
                          &nbsp;&nbsp;{user.address}
                          <span className="p-2">
                            <Icon.Edit2
                              size={15}
                              onClick={() =>
                                onOpenEditText("address", user.address)
                              }
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-4">
                  <div className="card card-plain h-100">
                    <div className="card-header pb-0 p-3">
                      <h6 className="mb-0">Thông tin công ty</h6>
                    </div>
                    <div className="card-body p-3">
                      <ul className="list-group">
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Ngày vào làm:</strong>
                          &nbsp;&nbsp; {convertYMD(user.working_date)}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Phòng ban:</strong>
                          &nbsp;&nbsp; {user.department_name}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Vị trí:</strong>
                          &nbsp;&nbsp; {user.position_name}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Tháng:</strong>
                          &nbsp;&nbsp; {user.month}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Mục tiêu:</strong>
                          &nbsp;&nbsp; {user.value}
                        </li>

                        <li className="list-group-item border-0 ps-0 text-sm my-4">
                          <strong className="text-dark">Mật khẩu:</strong>
                          &nbsp;&nbsp; ****************
                          <span className="p-2">
                            <Icon.Edit2
                              size={15}
                              onClick={() => onOpenEditText("password")}
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pb-2">
              <div className="d-flex justify-content-between">
                <h5>Tài liệu</h5>
              </div>
            </div>
            <Documents documents={documents} />
            <div className="card-body pb-2">
              <div className="d-flex justify-content-between">
                <h5>Đơn nghỉ phép</h5>
                <div className="d-flex">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"fr"}
                  >
                    <DatePicker
                      views={["year"]}
                      value={selectYear}
                      onChange={(newValue) => {
                        setSelectYear(newValue.$d);
                        getLeaveOffs(newValue.$y);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </LocalizationProvider>
                  <button
                    className="badge badge-sm btn-background-violet float-right mx-2"
                    onClick={() => onLeaveOff()}
                  >
                    <Icon.Plus size={15} /> <span>Tạo đơn</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-body px-0 pt-0">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-xxs font-weight-bolder">
                            Loại đơn
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                            Nội dung
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Từ ngày
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Đến ngày
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Trạng thái
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveOffs.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div></div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {value.type_name}
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p
                                  className="text-xs font-weight-bold mb-0"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  {value.content}
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {convertDMY(value.off_from)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {convertDMY(value.off_to)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                {value.status > 0 ? (
                                  <span className="badge badge-sm bg-gradient-info">
                                    Đã duyệt {value.status}
                                  </span>
                                ) : (
                                  <span className="badge badge-sm bg-gradient-warning">
                                    Chưa duyệt {value.status}
                                  </span>
                                )}
                              </td>
                              <td className="align-middle text-center">
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={
                                    value.status < 1
                                      ? () => onLeaveOff(value.id)
                                      : () => {}
                                  }
                                >
                                  {value.status < 1 ? (
                                    <Icon.Edit
                                      size={20}
                                      color="#fff"
                                      fill="#8075ef"
                                    />
                                  ) : (
                                    <Icon.Edit size={18} />
                                  )}
                                </span>
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={
                                    value.status < 1
                                      ? () => onConfirmDelete(value.id)
                                      : () => {}
                                  }
                                >
                                  {value.status < 1 ? (
                                    <Icon.X
                                      size={20}
                                      color="#e91e63"
                                      fill="#e91e63"
                                    />
                                  ) : (
                                    <Icon.X size={18} />
                                  )}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreateLeaveOff
          visible={isLeaveOffs}
          onClose={onLeaveOff}
          onConfirm={onConfirmLeaveOff}
          id={leaveOffID}
        />
        <Confirm
          visible={isLeaveOffDel}
          onClose={onConfirmDelete}
          onConfirm={onDeleteLeaveOff}
          header="Thu hồi đơn nghỉ phép"
          title="Bạn muốn thu hồi đơn phép này?"
        />
        <Footer />
      </main>
    </section>
  );
}

export default Profile;
