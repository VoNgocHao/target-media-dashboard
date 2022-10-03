import React, { useState } from "react";
import "../index.css";
import image from "../img/bg-01.jpg";
import { isEmpty } from "./helper";
import { toast, ToastContainer } from "react-toastify";
import API from "./api";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (isEmpty(email)) {
      toast.error("Email cannot be empty!");
      return;
    }
    if (isEmpty(password)) {
      toast.error("Password cannot be empty!");
      return;
    }
    await API.postParam("/login.php", {
      email: email,
      password: password,
    }).then((res) => {
      if (res.success) {
        history.push("/");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <section>
      <ToastContainer />
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form">
              <span className="login100-form-title p-b-43 mb-3">
                Login to Target Media
              </span>

              <div className="wrap-input100">
                <input
                  className="input100"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={40}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.code === 13) {
                      onLogin();
                    }
                  }}
                />
              </div>

              <div className="wrap-input100">
                <input
                  className="input100"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={40}
                  onKeyDown={(e) => {
                    if (e.code === "Enter" || e.code === 13) {
                      onLogin();
                    }
                  }}
                />
              </div>

              <div className="container-login100-form-btn mt-5">
                <button className="login100-form-btn" onClick={() => onLogin()}>
                  Login
                </button>
              </div>
            </div>
            <div
              className="login100-more"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
