import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import { SERVER_BASE_URL } from '../config/config';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch  = useDispatch();

  var validateLoginForm = (email, password) => {
    let errors = {};
    if (!email) {
      errors.email = "*E-mail is required";
    }
    if (!password) {
      errors.password = "*Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handelLoginForm = async (e) => {
    console.log("SERVER_URLSERVER_URLSERVER_URLSERVER_URLSERVER_URLSERVER_URL",SERVER_BASE_URL)
    e.preventDefault();
    const isValidate = validateLoginForm(email, password);

    if (isValidate) {
      const loginData = {
        email: email,
        password: password,
      };

      try {
          dispatch(showLoading())
        const res = await axios.post(SERVER_BASE_URL+
          "/api/v1/user/login",
          JSON.stringify(loginData),
          {
            headers: { "content-type": "application/json" },
          }
        );

        if (res.data.success) {
          dispatch(hideLoading())
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
        if (!res.data.success) {
          dispatch(hideLoading())
          toast.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error);
      }
    }
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="#">
          <img
            src="asserts/logo/health.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: "1" }}
            height="150"
            width="150"
          />
          {/* <b>Admin</b>LTE */}
        </a>
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form method="post" onSubmit={handelLoginForm}>
            <span className="error-text">
              {errors.email ? errors.email : ""}
            </span>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>

            <span className="error-text">
              {errors.password ? errors.password : ""}
            </span>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                {/* <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div> */}
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </div>
          </form>
          {/* <div className="social-auth-links text-center mb-3">
            <p>- OR -</p>
            <a href="#" className="btn btn-block btn-primary">
              <i className="fab fa-facebook mr-2" /> Sign in using Facebook
            </a>
            <a href="#" className="btn btn-block btn-danger">
              <i className="fab fa-google-plus mr-2" /> Sign in using Google+
            </a>
          </div> */}
          {/* <p className="mb-1">
            <a href="forgot-password.html">I forgot my password</a>
          </p> */}
          <p className="mb-0">
            <Link to="/register" className="text-center">
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
