import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import { SERVER_BASE_URL } from "../config/config.local";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()

  const validateForm = (
    fullname,
    email,
    password,
    confirm_password,
    usertype,
    agreeTerms
  ) => {
    const errors = {};
    if (!fullname) {
      errors.fullname = "*Full name is required";
    }
    if (!email) {
      errors.email = "*E-mail is required";
    }
    if (!password) {
      errors.password = "*Password is required";
    }
    if (!confirm_password) {
      errors.confirm_password = "*Confirm password is required";
    }
    if (!usertype) {
      errors.usertype = "*Registration type is required";
    }
    if (password != confirm_password) {
      errors.confirm_password = "*Confirm password does not match";
    }

    if (!agreeTerms) {
      errors.agreeTerms = "*Please check terms and condition";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handelRegForm = async (e) => {
    e.preventDefault();

    const isValid = validateForm(
      fullname,
      email,
      password,
      confirm_password,
      usertype,
      agreeTerms
    );

    if (isValid) {
      const registerData = {
        usertype: usertype,
        fullname: fullname,
        email: email,
        password: password,
      };
      try {
        dispatch(showLoading())
        const res = await axios.post(SERVER_BASE_URL+
          "api/v1/user/register",
          JSON.stringify(registerData),
          { headers: { "content-type": "application/json" } }
        );

        if (res.data.success) {
          dispatch(hideLoading())
          toast.success(res.data.message);
          setFullname("");
          setEmail("");
          setPassword("");
          setUsertype("");
          setConfirm_password("");
          setAgreeTerms("");
        }
        //alert(res.data.message);
        if (!res.data.success) {
          dispatch(hideLoading())
          toast.error(res.data.message ? res.data.message : "");
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
  };

  return (
    <div className="register-box">
      <div className="register-logo">
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
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register here</p>
          <form onSubmit={handelRegForm}>
            <span className="error-text">{errors.usertype}</span>
            <div className="input-group mb-3">
              <select
                className="form-control"
                name="usertype"
                value={usertype}
                onChange={(e) => setUsertype(e.target.value)}
              >
                <option value="">--Select Type--</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="clinic">Clinic</option>
                <option value="hospital">Hospital</option>
              </select>

              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-briefcase-medical" />
                </div>
              </div>
            </div>

            <span className="error-text">{errors.fullname}</span>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="fullname"
                value={fullname}
                placeholder="Full name"
                onChange={(e) => setFullname(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>

            <span className="error-text">
              {errors.email ? errors.email : ""}
            </span>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>

            <span className="error-text">{errors.password}</span>
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

            <span className="error-text">{errors.confirm_password}</span>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                value={confirm_password}
                placeholder="Retype password"
                onChange={(e) => setConfirm_password(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>

            <div className="row">
              <span className="error-text">{errors.agreeTerms}</span>
              <div className="col-8">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    id="agreeTerms"
                    name="agreeTerms"
                    value={agreeTerms}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
            </div>
          </form>
          {/* <div className="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" className="btn btn-block btn-primary">
              <i className="fab fa-facebook mr-2" />
              Sign up using Facebook
            </a>
            <a href="#" className="btn btn-block btn-danger">
              <i className="fab fa-google-plus mr-2" />
              Sign up using Google+
            </a>
          </div> */}
          <Link className="text-center" to="/login">
            I already have registered
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Register;
