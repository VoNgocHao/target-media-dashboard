import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import PopupEditText from "../Components/popup-edit-text";
import { toast } from "react-toastify";
import API from "../api";
import { convertYMD } from "../helper";
import ImgUserDefault from "../../img/user-pase.jpeg";
import Loading from "../Components/loading";

function Profile() {
  const [openEditText, setOpenEditText] = useState(false);
  const [editType, setEditType] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

  const getProfile = async () => {
    await API.getAPIData("/get-profile.php").then((res) => {
      if (res.success) {
        setUser(res.data);
      } else {
        toast.error(res.message);
      }
    });
  };

  const onSuccessEdit = async () => {
    setIsLoading(true);
    getProfile();
    onOpenEditText();
    setIsLoading(false);
  };

  return (
    <section>
      <PopupEditText
        visible={openEditText}
        style={{ zIndex: "10" }}
        onClose={onOpenEditText}
        header={"Edit "}
        type={editType}
        content={contentEdit}
        onConfirm={onSuccessEdit}
      />
      {isLoading && <Loading />}
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Profile" />
        <div className="container-fluid px-2 px-md-4">
          <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage: `url(${"/images/" + user.url_avata ||
                ImgUserDefault})`,
            }}
          ></div>
          <div className="card card-body mx-3 mx-md-4 mt-n6">
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src={"/images/" + user.url_avata || ImgUserDefault}
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
                          <h6 className="mb-0">Profile Information</h6>
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
                          <strong className="text-dark">Full Name:</strong>
                          &nbsp;&nbsp;{user.full_name}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Phone:</strong>
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
                          <strong className="text-dark">Birthdate:</strong>
                          &nbsp;&nbsp;{convertYMD(user.birth_date)}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Email:</strong>
                          &nbsp;&nbsp;{user.email}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Address:</strong>
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
                      <h6 className="mb-0">Company Information</h6>
                    </div>
                    <div className="card-body p-3">
                      <ul className="list-group">
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Working Date:</strong>
                          &nbsp;&nbsp; {convertYMD(user.working_date)}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Deparment:</strong>
                          &nbsp;&nbsp; {user.department_name}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Position:</strong>
                          &nbsp;&nbsp; {user.position_name}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Month:</strong>
                          &nbsp;&nbsp; {user.month}
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Target:</strong>
                          &nbsp;&nbsp; {user.value}
                        </li>

                        <li className="list-group-item border-0 ps-0 text-sm my-4">
                          <strong className="text-dark">Password:</strong>
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
          </div>
        </div>
        <Footer />
      </main>
    </section>
  );
}

export default Profile;
