import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import API from "../api";
import Confirm from "./confirm";
import { useHistory } from "react-router-dom";
import { timePost } from "../helper";
import ReadNotification from "./read-notification";

function Header({ title }) {
  const history = useHistory();
  const [openNotification, setOpenNotification] = useState(false);
  const [isQuesLogout, setIsQuesLogout] = useState(false);
  const [isReadNotifi, setIsReadNotifi] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState("");

  useEffect(() => {
    loginCredentials();
    getNotificationUnread();
  }, []);

  const loginCredentials = async () => {
    await API.getAPIData("/login-credentials.php").then((res) => {
      if (!res.success) {
        history.push("/login");
      }
    });
  };

  const showNav = () => {
    const sidenav = document.getElementById("sidenav-main");
    sidenav.classList.remove("display-none-nav");
  };

  const onOpenNotification = () => {
    setOpenNotification(!openNotification);
  };

  const onIsQuesLogout = () => {
    setIsQuesLogout(!isQuesLogout);
  };

  const onLogout = () => {
    onIsQuesLogout();
    API.getAPIData("/logout.php").then((res) => {
      if (res.success) {
        history.push("/login");
      }
    });
  };

  const getNotificationUnread = async () => {
    await API.getAPIData("/notifications-unread-user.php").then((res) => {
      if (res.success) {
        setNotifications(res.data);
      }
    });
  };

  const onOpenReadNotification = (id) => {
    setNotificationId(id);
    setIsReadNotifi(!isReadNotifi);
  };

  const onConfirmNotification = () => {
    onOpenReadNotification();
    getNotificationUnread();
  };

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl blur mt-2"
      id="navbarBlur"
      navbar-scroll="true"
      style={{ zIndex: 1 }}
    >
      <div className="container-fluid py-1 px-3 d-f d-flex">
        <nav aria-label="breadcrumb" className="d-flex">
          <div
            className="breadcrumb-item text-sm hamburger-display"
            onClick={() => showNav()}
          >
            <Icon.AlignJustify />
          </div>
          <ol className="breadcrumb mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">Pages</li>
            <li
              className="breadcrumb-item text-sm text-dark active"
              aria-current="page"
            >
              {title}
            </li>
          </ol>
        </nav>
        <div className="collapse navbar-collapse d-flex navbar-collapse-ntf-mb">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
          <ul
            className="navbar-nav justify-content-end d-flex"
            style={{ flexDirection: "row" }}
          >
            <li className="nav-item d-flex align-items-center">
              {/* eslint-disable-next-line */}
              <a className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span
                  className="d-sm-inline d-none cursor-pointer"
                  onClick={() => onIsQuesLogout()}
                >
                  Sign Out
                </span>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center"></li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              {/* eslint-disable-next-line */}
              <a
                className="nav-link text-body p-0"
                onClick={() => onOpenNotification()}
              >
                <div className="munber-notification">
                  {notifications.length}
                </div>
                <Icon.Bell size={17} />
              </a>
              {openNotification && (
                <ul className="dropdown-menu dropdown-menu-end px-2 py-3 notifications-po">
                  <div>
                    <h6 className="mx-2">Notifications</h6>
                    <div
                      className="close-x-navbar-dropdown"
                      onClick={() => onOpenNotification()}
                    >
                      X
                    </div>
                  </div>
                  {notifications.map((value) => {
                    return (
                      <li className="mb-2">
                        {/* eslint-disable-next-line */}
                        <a
                          className="dropdown-item border-radius-md"
                          key={value.id}
                          onClick={() =>
                            onOpenReadNotification(value.notification_id)
                          }
                        >
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              <img
                                src={"/images/" + value.url_avata}
                                className="avatar avatar-sm me-3"
                                alt="img"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1 show-one-line-200px">
                                <span className="font-weight-bold">
                                  {value.title}
                                </span>
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1"></i>
                                {timePost(value.created_at || "")}
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Confirm
        visible={isQuesLogout}
        onClose={onIsQuesLogout}
        onConfirm={onLogout}
        title={"Are you sure you want to logout?"}
        header={"Logout"}
      />
      <ReadNotification
        visible={isReadNotifi}
        onClose={onOpenReadNotification}
        onConfirm={onConfirmNotification}
        id={notificationId}
      />
    </nav>
  );
}

export default Header;
