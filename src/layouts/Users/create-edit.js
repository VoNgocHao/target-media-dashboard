import React from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";

function UserCreate() {
  let history = useHistory();
  // const [page, setPage] = useState({
  //   page: 1,
  //   size: 15,
  //   totalPages: 10,
  // });

  const onToListView = () => {
    history.push("/users");
  };
  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="New User" />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="row my-2">
              <div className="col-md-12">
                <button
                  className="badge badge-sm btn-background-back"
                  onClick={() => onToListView()}
                >
                  <Icon.ArrowLeft size={15} /> Back
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="card my-1">
                <div className="card-body pb-2">
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>UserName: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Email Address: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      <label>Address: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Birth Date: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Phone: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Deparment: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Position: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6 mb-md-0 mb-4">
                      <label>Start Working Date: </label>
                      <div className="input-group input-group-outline">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-md-0 mb-4"></div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      <label>Introduce: </label>
                      <div className="input-group input-group-outline">
                        <textarea
                          type="text"
                          className="form-control"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pb-2">
                  <h4>Document Information</h4>
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
                              <th className="text-center text-uppercase text-xxs font-weight-bolder">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      John Michael
                                    </h6>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  23/04/18
                                </span>
                              </td>
                              <td className="align-middle">
                                <span className="text-secondary text-xs font-weight-bold">
                                  23/04/18
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <a
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  <Icon.Download />
                                </a>
                                <a
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  <Icon.X />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-md-12">
                      <button
                        className="badge badge-sm btn-background-violet float-right"
                        onClick={() => onToListView()}
                      >
                        <Icon.Plus size={15} /> Create
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
    </section>
  );
}

export default UserCreate;
