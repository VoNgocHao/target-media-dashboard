import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import Paginator from "../Components/paginato";
import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { convertYMD, caculatePage, caculateOffSet } from "../helper";

function Users() {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState({
    page: 0,
    size: 10,
    totalPages: 10,
  });
  const size = 10;
  useEffect(() => {
    getUsers(1, "");
  }, []);

  const getUsers = async (page, ipSearch) => {
    let url = `/users.php?offset=${caculateOffSet(page, size)}&size=${size}`;
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

  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Users" />
        <div className="container-fluid py-2">
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
                          placeholder="Find name, email"
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
                  <Icon.Plus size={15} /> Create
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
                            Author
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                            Function
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Working Date
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={value.url_avata}
                                      className="avatar avatar-sm me-3 border-radius-lg"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {value.firstname} {value.lastname}
                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      {value.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">
                                  Manager
                                </p>
                                <p className="text-xs text-secondary mb-0">
                                  Organization
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-success">
                                  {value.status}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {convertYMD(value.working_date)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <a
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
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
    </section>
  );
}

export default Users;
