import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Confirm from "../Components/confirm";
import {
  isEmpty,
  phoneValidation,
  emailValidation,
  convertMDY,
} from "../helper";
import { toast } from "react-toastify";
import API from "../api";
import * as Constant from "../constant";
import { useParams } from "react-router-dom";
import Loading from "../Components/loading";
import { useQuery } from "react-query";

function UserCreate() {
  document.title = "Users";
  const { id } = useParams();
  const [user, setUser] = useState({
    id: 0,
    full_name: "",
    address: "",
    email: "",
    birth_date: "",
    phone: "",
    department_id: 0,
    position_id: 0,
    working_date: "",
    introduce: "",
    status: "activity",
    url_avata: "",
  });
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isError, setIsError] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNameDel, setFileNameDel] = useState("");
  const [isdelete, setIsdelete] = useState(false);
  let history = useHistory();
  const onToListView = () => {
    history.push("/users");
  };

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      getUserDetail();
      setDocuments([]);
    }
    getDepartment();
    getPositions();
    setIsLoading(false);
  }, []);

  const { refetch } = useQuery(
    ["GET_DOC_USER", id],
    () => API.getAPIData(`/api/user-document.php?id=${id}`),
    {
      retry: 3,
      refetchOnWindowFocus: true,
      onSuccess: (res) => {
        if (res.success) {
          setDocuments([...res.data]);
        } else {
          setDocuments([]);
        }
      },
    }
  );

  const getUserDetail = async () => {
    const response = await API.createOrUpdateUser("/api/get-user.php?id=" + id);

    if (response.success) {
      const data = response.data;
      setUser({
        id: data.id,
        full_name: data.full_name,
        address: data.address,
        email: data.email,
        birth_date: data.birth_date,
        phone: data.phone,
        department_id: data.department_id,
        position_id: data.position_id,
        working_date: data.working_date,
        introduce: data.description,
        status: data.status,
        url_avata: data.url_avata,
      });
    } else {
      toast.error(response.message);
    }
  };

  const validateParam = () => {
    let validateUser = { ...user };
    delete validateUser.introduce;
    delete validateUser.id;
    delete validateUser.url_avata;
    const errorValue = Object.values(validateUser).filter(
      (x) => x === "" || x === undefined || x < 1
    );
    let isValue = true;
    if (errorValue.length > 0) {
      toast.error("Value cannot be empty!");
      isValue = false;
    }
    if (!emailValidation(user.email)) {
      toast.error("Email is incorrect!");
      isValue = false;
    }
    if (!phoneValidation(user.phone)) {
      toast.error("Phone number is incorrect!");
      isValue = false;
    }

    setIsLoading(false);

    setIsError(!isValue);
    return isValue;
  };

  const onCreateOrUpdateUser = async () => {
    setIsLoading(true);
    onSetIsConfirm();

    if (!validateParam()) {
      return;
    }

    const response = await API.createOrUpdateUser("/api/user-save.php", user);

    if (response.success) {
      toast.success(id ? "Update successfully!" : "Create successfully!");
      if (!id) {
        history.push("/users");
      } else {
        getUserDetail();
      }
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  const getDepartment = async () => {
    const res = await fetch(`/api/departments.php`).then((response) =>
      response.json()
    );
    if (res.success) {
      setDepartments(res.data);
    }
  };

  const getPositions = async () => {
    const res = await fetch(`/api/positions.php`).then((response) =>
      response.json()
    );
    if (res.success) {
      setPositions(res.data);
    }
  };

  const onSetIsConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const onSetIsConfirmDel = (file_name) => {
    setFileNameDel(file_name);
    setIsdelete(!isdelete);
  };

  const onConfirmDelete = async () => {
    onSetIsConfirmDel();
    await API.getAPIData(
      `/upload/delete-file.php?file_name=${fileNameDel}`
    ).then((res) => {
      if (res.success) {
        toast.success(res.message);
        refetch();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <section>
      {isLoading && <Loading />}
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title={!id ? "Create User" : "Edit User"} />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="row my-2">
              <div className="col-md-12">
                <button
                  className="badge badge-sm btn-background-back"
                  onClick={() => onToListView()}
                >
                  <span className="mx-2">
                    <Icon.ArrowLeft size={15} /> Back
                  </span>
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="card my-1">
                <div className="card-body pb-2">
                  <h5>Personal informations</h5>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Full Name: </label>
                      <div
                        className={
                          isError && isEmpty(user.full_name)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <input
                          type="text"
                          className="form-control"
                          value={user.full_name}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.full_name = e.target.value;
                            setUser({ ...newUser });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Email Address: </label>
                      <div
                        className={
                          isError && isEmpty(user.email)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <input
                          type="text"
                          className="form-control"
                          value={user.email}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.email = e.target.value;
                            setUser({ ...newUser });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      <label>Address: </label>
                      <div
                        className={
                          isError && isEmpty(user.address)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <input
                          type="text"
                          className="form-control"
                          value={user.address}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.address = e.target.value;
                            setUser({ ...newUser });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Birth Date: </label>
                      <div
                        className={
                          isError && isEmpty(user.birth_date)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={user.birth_date || ""}
                            onChange={(newValue) => {
                              const date = new Date(newValue.$d).toLocaleString(
                                "af-ZA"
                              );
                              const newUser = user;
                              newUser.birth_date = date;
                              setUser({ ...newUser });
                            }}
                            renderInput={(params) => (
                              <TextField {...params} type="date" />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Phone: </label>
                      <div
                        className={
                          isError && isEmpty(user.phone)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <input
                          type="text"
                          className="form-control"
                          value={user.phone}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.phone = e.target.value;
                            setUser({ ...newUser });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Department: </label>
                      <div
                        className={
                          isError && user.department_id < 1
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <select
                          className="form-control"
                          value={user.department_id}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.department_id = e.target.value;
                            setUser({ ...newUser });
                          }}
                        >
                          <option value={0}>-- Select department --</option>
                          {departments.map((value, index) => {
                            return (
                              <option value={value.id} key={index}>
                                {value.department_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Positions: </label>
                      <div
                        className={
                          isError && user.position_id < 1
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <select
                          className="form-control"
                          value={user.position_id}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.position_id = e.target.value;
                            setUser({ ...newUser });
                          }}
                        >
                          <option value={0}>-- Select position --</option>

                          {positions.map((value, index) => {
                            return (
                              <option value={value.id} key={index}>
                                {value.position_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Start Working Date: </label>
                      <div
                        className={
                          isError && isEmpty(user.working_date)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={user.working_date || ""}
                            onChange={(newValue) => {
                              const date = new Date(newValue.$d).toLocaleString(
                                "af-ZA"
                              );
                              const newUser = user;
                              newUser.working_date = date;
                              setUser({ ...newUser });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Status: </label>
                      <div
                        className={
                          isError && isEmpty(user.status)
                            ? "input-group input-group-outline border-input-error"
                            : "input-group input-group-outline"
                        }
                      >
                        <select
                          className="form-control"
                          value={user.status}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.status = e.target.value;
                            setUser({ ...newUser });
                          }}
                          disabled={!id}
                        >
                          {Constant.status_user.map((value, index) => {
                            return (
                              <option value={value.value} key={index}>
                                {value.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      <label>Introduce: </label>
                      <div className="input-group input-group-outline">
                        <textarea
                          type="text"
                          className="form-control"
                          rows="4"
                          value={user.introduce}
                          onChange={(e) => {
                            const newUser = user;
                            newUser.introduce = e.target.value;
                            setUser({ ...newUser });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pb-2" hidden={!id}>
                  <div className="d-flex justify-content-between">
                    <h5>Documents</h5>
                    <button
                      className="badge badge-sm btn-background-violet float-right"
                      onClick={() => {
                        window.open(
                          `/upload/upload-files.php?key=${Constant.keyString}&id=1`,
                          ""
                        );
                      }}
                    >
                      <span className="mx-2">
                        <Icon.Upload size={15} /> Upload
                      </span>
                    </button>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-xxs font-weight-bolder">
                                File Name
                              </th>
                              <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                                Uploaded Time
                              </th>
                              <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                                Uploaded By
                              </th>
                              <th
                                className="text-center text-uppercase text-xxs font-weight-bolder"
                                style={{ width: "100px" }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex px-2 py-1">
                                      <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">
                                          {value.name}
                                        </h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="align-middle">
                                    <span className="text-secondary text-xs font-weight-bold">
                                      {convertMDY(value.updated_at)}
                                    </span>
                                  </td>
                                  <td className="align-middle">
                                    <span className="text-secondary text-xs font-weight-bold">
                                      {value.full_name}
                                    </span>
                                  </td>
                                  <td className="align-middle text-center">
                                    <a
                                      className="text-secondary font-weight-bold text-xs"
                                      href={`/upload/uploads/${value.name}`}
                                    >
                                      <Icon.Download
                                        size={18}
                                        color="#8075ef"
                                      />
                                    </a>
                                    <span
                                      className="text-secondary font-weight-bold text-xs mx-2"
                                      onClick={() =>
                                        onSetIsConfirmDel(value.name)
                                      }
                                    >
                                      <Icon.X size={18} color="#ff0000" />
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
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="badge badge-sm btn-background-violet float-right"
                        onClick={() => onSetIsConfirm()}
                      >
                        <span className="mx-2">
                          <Icon.Plus size={15} /> {!id ? " Create " : " Save "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
      <Confirm
        visible={isConfirm}
        header={!id ? "Create user" : "Update user"}
        title={
          !id
            ? "Are you sure you want to create user?"
            : "Are you sure you want to update user?"
        }
        onClose={onSetIsConfirm}
        onConfirm={onCreateOrUpdateUser}
      />
      <Confirm
        visible={isdelete}
        header={"Delete document"}
        title={"Are you sure you want to deleted document?"}
        onClose={onSetIsConfirm}
        onConfirm={onConfirmDelete}
      />
    </section>
  );
}

export default UserCreate;
