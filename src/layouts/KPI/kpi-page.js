import React, { useState } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import Paginator from "../Components/paginato";

function KpiPage() {
  const [page] = useState({
    page: 1,
    size: 15,
    totalPages: 10,
  });

  const data = [
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
    {
      image:
        "https://node-js-react-soft-dashboard.appseed-srv1.com/static/media/bruce-mars.45f64779.jpg",
      name: "John Michael",
      email: "alexa@creative-tim.com",
      location: "Manager",
      deparment: "HR",
      status: "online",
      working_date: "23/04/18",
    },
  ];
  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="KPI" />
        <div className="container-fluid py-2">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-body">
                  <div className="row my-2">
                    <div className="col-md-4 mb-md-0 mb-4">
                      <div class="input-group input-group-outline">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Find name, email"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mb-md-0 mb-4">
                      <div class="input-group input-group-outline">
                        <select class="form-control">
                          <option>---Select Month---</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 mb-md-0 mb-4">
                      <div class="input-group input-group-outline">
                        <select class="form-control">
                          <option>---Select Target---</option>
                          <option>{"<"} 1000$</option>
                          <option>1000$ - 2000$</option>
                          <option>2001 - 5000$</option>
                          <option>5001$ 10000$</option>
                          <option>{">"} 10000$</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-4 mb-md-0 mb-4"></div>
                    <div className="col-md-4 mb-md-0 mb-4"></div>
                    <div className="col-md-4 mb-md-0 mb-4">
                      <button className="badge badge-sm btn-background-gr float-right">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-md-12">
                <button className="badge badge-sm btn-background-green float-right">
                  Inport
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="card my-1">
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Author
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Target
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Month
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={value.image}
                                      className="avatar avatar-sm me-3 border-radius-lg"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {value.name}
                                    </h6>
                                    <p className="text-xs text-secondary mb-0">
                                      {value.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-success">
                                  {index * 5 + 1000}$
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  08
                                </span>
                              </td>
                              <td className="align-middle">
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
                      // onPageChange={(newpage) => onPageChange(newpage)}
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

export default KpiPage;
