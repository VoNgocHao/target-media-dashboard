import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import Paginator from "../Components/paginato";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { convertYMD, caculatePage, caculateOffSet } from "../helper";
import userImg from "../../img/user-pase.jpeg";
import Loading from "../Components/loading";
import Confirm from "../Components/confirm";
import { toast } from "react-toastify";
import API from "../api";
import { status_user } from "../constant";

function Users() {
  document.title = "Nhân viên";
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idDeleted, setIdDeleted] = useState("");
  const [idResetKey, setIdResetKey] = useState("");
  const [page, setPage] = useState({
    page: 0,
    size: 10,
    totalPages: 10,
  });
  const size = 10;
  useEffect(() => {
    setIsLoading(true);
    getUsers(1, "");
    getDepartment();
    getPositions();
    setIsLoading(false);
  }, []);

  const getUsers = async (page, ipSearch) => {
    let url = `/api/users.php?offset=${caculateOffSet(
      page,
      size
    )}&size=${size}`;
    if (ipSearch !== "" && ipSearch !== null && ipSearch !== undefined) {
      url = url + `&search_term=${ipSearch}`;
    }
    const res = await fetch(url).then((response) => response.json());

    if (res.success) {
      setUsers(res.data);
      setPage({
        page: page,
        size: size,
        totalPages: caculatePage(res.total, size),
      });
    } else {
      setUsers([]);
      setPage({
        page: 0,
        size: 0,
        totalPages: 0,
      });
    }
  };

  const getDepartment = async () => {
    let url = `/api/departments.php`;
    const res = await fetch(url).then((response) => response.json());
    if (res.success) {
      setDepartments(res.data);
    }
  };

  const getPositions = async () => {
    let url = `/api/positions.php`;
    const res = await fetch(url).then((response) => response.json());
    if (res.success) {
      setPositions(res.data);
    }
  };

  const onPageChange = (newPage) => {
    setPage({ ...page, page: newPage });
    getUsers(newPage);
  };

  const onCreateBtnClick = () => {
    history.push("/user/create");
  };

  const onChangeSearch = (value) => {
    setInputSearch(value);
    getUsers(0, value);
  };

  const onConfirmDelete = (id) => {
    setIdDeleted(id);
  };

  const onSetIdDeleteNull = () => {
    setIdDeleted("");
  };
  const onDeleteUser = async () => {
    setIsLoading(true);
    const res = await fetch(
      "/api/delete-user.php?id=" + idDeleted
    ).then((response) => response.json());
    onSetIdDeleteNull();
    if (res.success) {
      toast.success("Deleted successfully!");
      getUsers(1, "");
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };

  const onConfirmResetPass = (id) => {
    setIdResetKey(id);
  };

  const onResetPassNull = () => {
    setIdResetKey("");
  };

  const onResetPassword = async () => {
    setIsLoading(true);
    const res = await API.resetPassword("/api/reset-password.php", {
      id: idResetKey,
    });
    onResetPassNull();
    if (res.success) {
      toast.success("Reset password thành công!");
      getUsers(1, "");
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Danh sách nhân viên" />
        <div className="container-fluid py-2">
          {isLoading && <Loading />}
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-body">
                  <div className="row my-2">
                    <div className="col-md-12">
                      <div className="input-group input-group-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tìm theo tên hoặc email"
                          value={inputSearch}
                          onChange={(e) => onChangeSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-md-12">
                <button
                  className="badge badge-sm btn-background-violet float-right"
                  onClick={() => onCreateBtnClick()}
                >
                  <span className="px-2">
                    <Icon.Plus size={15} /> Thêm nhân viên
                  </span>
                </button>
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
                            Họ và tên
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                            Phòng ban
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Trạng thái
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Ngày vào làm
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((value, index) => {
                          const department = departments.find(
                            (x) => x.id === value.department_id
                          );
                          const position = positions.find(
                            (x) => x.id === value.position_id
                          );
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={
                                        value.url_avata
                                          ? "/api/images/" + value.url_avata
                                          : userImg
                                      }
                                      className="avatar avatar-sm me-3 border-radius-lg"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {value.full_name}
                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      {value.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  {department ? department.department_name : ""}
                                </p>
                                <p className="text-xs text-secondary mb-0">
                                  {position ? position.position_name : ""}
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-success">
                                  {status_user.find(
                                    (x) => x.value === value.status
                                  ).label || ""}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {convertYMD(value.working_date)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={() => onConfirmResetPass(value.id)}
                                >
                                  <Icon.Key
                                    size={20}
                                    color="#3498db"
                                    fill="#4caf50"
                                  />
                                </span>
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={() =>
                                    history.push("/user/" + value.id)
                                  }
                                >
                                  <Icon.Edit
                                    size={20}
                                    color="#fff"
                                    fill="#8075ef"
                                  />
                                </span>
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={() => onConfirmDelete(value.id)}
                                >
                                  <Icon.X
                                    size={20}
                                    color="#e91e63"
                                    fill="#e91e63"
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="page-right">
                    <Paginator
                      {...page}
                      onPageChange={(newpage) => onPageChange(newpage)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <Confirm
        visible={!!idDeleted}
        header={"Xoá nhân viên"}
        title={"Bạn muốn xoá nhân viên?"}
        onClose={onSetIdDeleteNull}
        onConfirm={onDeleteUser}
      />
      <Confirm
        visible={!!idResetKey}
        header={"Reset password"}
        title={"Bạn muốn reset password?"}
        onClose={onResetPassNull}
        onConfirm={onResetPassword}
      />
    </section>
  );
}

export default Users;
