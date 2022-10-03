import React from "react";
import { ToastContainer } from "react-toastify";

function Footer({ title }) {
  const data = new Date();
  return (
    <footer className="footer py-4  ">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              © {data.getFullYear()}, Target Media
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
