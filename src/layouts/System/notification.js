import React, { useState, useEffect } from "react";
import Footer from "../Components/footer";
import Header from "../Components/header";
import NavBar from "../Components/navbar";
import Paginator from "../Components/paginato";
// import { useHistory } from "react-router-dom";
import * as Icon from "react-feather";
import { caculatePage, caculateOffSet } from "../helper";
import Loading from "../Components/loading";
import Confirm from "../Components/confirm";
import { toast } from "react-toastify";
// import API from "../api";
import CreateNotification from "../Components/create-notification";

function Notification() {
  document.title = "Notification";
  // let history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idDeleted, setIdDeleted] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [idDetail, setIdDetail] = useState("");
  const [page, setPage] = useState({
    page: 0,
    size: 10,
    totalPages: 10,
  });
  const size = 10;
  useEffect(() => {
    setIsLoading(true);
    getNotifications(1, "");
    setIsLoading(false);
  }, []);

  const getNotifications = async (page) => {
    let url = `/api/notifications.php?offset=${caculateOffSet(
      page,
      size
    )}&size=${size}`;

    const res = await fetch(url).then((response) => response.json());

    if (res.success) {
      setNotifications(res.data);
      setPage({
        page: page,
        size: size,
        totalPages: caculatePage(res.total, size),
      });
    } else {
      setNotifications([]);
      setPage({
        page: 0,
        size: 0,
        totalPages: 0,
      });
    }
  };

  const onPageChange = (newPage) => {
    setPage({ ...page, page: newPage });
    getNotifications(newPage);
  };

  // const onConfirmDelete = (id) => {
  //   setIdDeleted(id);
  // };

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
      getNotifications(1, "");
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };

  const onOpenCreate = (id) => {
    setIdDetail(id);

    setIsCreate(!isCreate);
  };

  const onConfirmNotification = () => {
    onOpenCreate();
    getNotifications(1, "");
  };
  return (
    <section>
      <NavBar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header title="Notification" />
        <div className="container-fluid py-2">
          {isLoading && <Loading />}

          <div className="row">
            <div className="row my-2">
              <div className="col-md-12">
                <button
                  className="badge badge-sm btn-background-violet float-right"
                  onClick={() => onOpenCreate()}
                >
                  <span className="px-2">
                    <Icon.Plus size={15} /> Create
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
                            Title
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                            Content
                          </th>
                          <th className="text-uppercase text-xxs font-weight-bolder ps-2">
                            Created at
                          </th>
                          <th className="text-center text-uppercase text-xxs font-weight-bolder">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ maxWidth: "300px" }}>
                                <div className="text-secondary text-xs font-weight-bold show-one-line">
                                  {value.title}
                                </div>
                              </td>
                              <td
                                className="align-middle"
                                style={{ maxWidth: "300px" }}
                              >
                                <div className="text-secondary text-xs font-weight-bold show-one-line">
                                  {value.content}
                                </div>
                              </td>
                              <td
                                className="align-middle"
                                style={{ width: "150px" }}
                              >
                                <span className="text-secondary text-xs font-weight-bold">
                                  {value.created_at}
                                </span>
                              </td>
                              <td
                                className="align-middle text-center"
                                style={{ width: "100px" }}
                              >
                                <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={() => onOpenCreate(value.id)}
                                >
                                  <Icon.Edit
                                    size={20}
                                    color="#fff"
                                    fill="#8075ef"
                                  />
                                </span>
                                {/* <span
                                  className="text-secondary font-weight-bold text-xs cursor-pointer p-1"
                                  onClick={() => onConfirmDelete(value.id)}
                                >
                                  <Icon.Check size={20} color="#4ad61c" />
                                </span> */}
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
        header={"Delete user"}
        title={"Are you sure you want to deleted user?"}
        onClose={onSetIdDeleteNull}
        onConfirm={onDeleteUser}
      />
      <CreateNotification
        visible={isCreate}
        onClose={onOpenCreate}
        onConfirm={onConfirmNotification}
        id={idDetail}
      />
    </section>
  );
}

export default Notification;
