import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import EditPermission from "../Components/edit-permission";

function Permissions() {
  const [departments, setDepartments] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openID, setOpenID] = useState("");

  useEffect(() => {
    getDepartment();
  }, []);

  const getDepartment = async () => {
    let url = `/api/departments.php`;
    const res = await fetch(url).then((response) => response.json());
    if (res.success) {
      setDepartments(res.data);
    }
  };

  const onOpenPopup = (id) => {
    setOpenID(id);
    setOpenPopup(!openPopup);
  };

  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Phân quyền" />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-xxs font-weight-bolder">
                            Phòng ban
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    {value.department_name}
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle">
                                {/* eslint-disable-next-line */}
                                <a
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  <span
                                    className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                    onClick={() => onOpenPopup(value.id)}
                                  >
                                    <Icon.Edit
                                      size={20}
                                      color="#fff"
                                      fill="#8075ef"
                                    />
                                  </span>
                                </a>
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
        <Footer />
        <EditPermission
          visible={openPopup}
          onClose={onOpenPopup}
          onConfirm={onOpenPopup}
          id={openID}
        />
      </main>
    </section>
  );
}

export default Permissions;
