import React from "react";
import * as Icon from "react-feather";

function NavBar() {
  const pathname = window.location.pathname;

  const hideNav = () => {
    const sidenav = document.getElementById("sidenav-main");
    sidenav.classList.add("display-none-nav");
  };

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-transparent display-none-nav"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <span
          className="cursor-pointer d-xl-none position-absolute end-0 top-0 opacity-5 p-2"
          onClick={() => hideNav()}
        >
          X
        </span>
        <a
          className="m-3 d-flex justify-content-center text-decoration-none"
          href="/dashboard"
        >
          <span className="ms-1 font-weight-bold text-dark">Target Media</span>
        </a>
      </div>
      <hr className="css-1pcem6n-MuiDivider-root" />
      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className={
                pathname === "/dashboard"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/dashboard"
            >
              <div
                className={
                  pathname === "/dashboard"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Codesandbox />
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/"
            >
              <div
                className={
                  pathname === "/"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Globe />
              </div>
              <span className="nav-link-text ms-1">Home Page</span>
            </a>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-8">
              Account pages
            </h6>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/users"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/users"
            >
              <div
                className={
                  pathname === "/users"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Users />
              </div>
              <span className="nav-link-text ms-1">Users</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/profile"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/profile"
            >
              <div
                className={
                  pathname === "/profile"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.User />
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/kpi"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/kpi"
            >
              <div
                className={
                  pathname === "/kpi"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Target />
              </div>
              <span className="nav-link-text ms-1">KPI</span>
            </a>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-8">
              Meeting pages
            </h6>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/meeting"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/meeting"
            >
              <div
                className={
                  pathname === "/meeting"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Calendar />
              </div>
              <span className="nav-link-text ms-1">Meeting</span>
            </a>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-8">
              System
            </h6>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/permissions"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/permissions"
            >
              <div
                className={
                  pathname === "/permissions"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Award />
              </div>
              <span className="nav-link-text ms-1">Permissions</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/notifications"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/notifications"
            >
              <div
                className={
                  pathname === "/notifications"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.Bell />
              </div>
              <span className="nav-link-text ms-1">Notifications</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                pathname === "/news"
                  ? "nav-link active bbtn-outline-info text-dark"
                  : "nav-link text-dark"
              }
              href="/news"
            >
              <div
                className={
                  pathname === "/news"
                    ? "text-center me-2 d-flex align-items-center justify-content-center text-white btn-navbar-icon navbar-background-select"
                    : "text-center me-2 d-flex align-items-center justify-content-center text-dark btn-navbar-icon navbar-background"
                }
              >
                <Icon.FileText />
              </div>
              <span className="nav-link-text ms-1">News</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default NavBar;
