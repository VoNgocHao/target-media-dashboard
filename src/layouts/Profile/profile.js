import React, { useState } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import PopupEditText from "../Components/popup-edit-text";

function Profile() {
  const [openEditText, setOpenEditText] = useState(false);
  const onOpenEditText = () => {
    setOpenEditText(!openEditText);
  };

  return (
    <section>
      <PopupEditText visible={openEditText} style={{ zIndex: "10" }} />

      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Profile" />
        <div className="container-fluid px-2 px-md-4">
          <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
            }}
          ></div>
          <div className="card card-body mx-3 mx-md-4 mt-n6">
            <div className="row gx-4 mb-2">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src="https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">Richard Davis</h5>
                  <p className="mb-0 font-weight-normal text-sm">
                    CEO / Co-Founder
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
                        <div className="col-md-4 text-end">
                          <a>
                            <i
                              className="fas fa-user-edit text-secondary text-sm"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit Profile"
                            ></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-3">
                      <p className="text-sm">
                        Hi, I’m Alec Thompson, Decisions: If you can’t decide,
                        the answer is no. If two equally difficult paths, choose
                        the one more painful in the short term (pain avoidance
                        is creating an illusion of equality).
                        <span className="p-2" onClick={() => onOpenEditText()}>
                          <Icon.Edit2 size={15} />
                        </span>
                      </p>
                      <hr className="horizontal gray-light my-4" />
                      <ul className="list-group">
                        <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                          <strong className="text-dark">Full Name:</strong>{" "}
                          &nbsp; Alec M. Thompson
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Mobile:</strong> &nbsp;
                          (44) 123 1234 123
                          <span className="p-2">
                            <Icon.Edit2 size={15} />
                          </span>
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Email:</strong> &nbsp;
                          alecthompson@mail.com
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Address:</strong> &nbsp;
                          99 Nguyen Hue strees, district 1, Ho Chi Minh Cty
                          <span className="p-2">
                            <Icon.Edit2 size={15} />
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
                          <strong className="text-dark">Working Date:</strong>{" "}
                          &nbsp; 19/09/1999
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Deparment:</strong>{" "}
                          &nbsp; Marketing
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Position:</strong>{" "}
                          &nbsp; CEO / Co-Founder
                        </li>

                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Target:</strong> &nbsp;
                          2000$
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm">
                          <strong className="text-dark">Month:</strong> &nbsp;
                          08
                        </li>
                        <li className="list-group-item border-0 ps-0 text-sm my-4">
                          <strong className="text-dark">Password:</strong>{" "}
                          &nbsp; ************
                          <span className="p-2">
                            <Icon.Edit2 size={15} />
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
