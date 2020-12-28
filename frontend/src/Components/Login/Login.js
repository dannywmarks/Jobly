import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Alert from "../Alert/Alert";
import JoblyApi from "../../api/JoblyApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./Login.css";

const Login = ({ setToken }) => {
  // history hook for
  const history = useHistory();
  // signup or login
  const [activeView, setActiveView] = useState("login");
  // form state
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    firstName: "",
    lastLname: "",
    email: "",
    errors: [],
  });

  // set form for login
  function setLoginView() {
    setActiveView("login");
  }

  // set form for signup
  function setSignupView() {
    setActiveView("signup");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data;
    let endpoint;

    if (activeView === "signup") {
      // these fields aren't req'd---pass undefined, not empty string
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
        firstName: loginInfo.firstName || undefined,
        lastName: loginInfo.lastName || undefined,
        email: loginInfo.email || undefined,
      };
      endpoint ="register";
    } else {
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
      };
      endpoint = "login";
    }

    let token;

    try {
      token = await JoblyApi[endpoint](data);
    } catch (errors) {
      return setLoginInfo((l) => ({ ...l, errors }));
    }

    setToken(token);
    history.push("/jobs");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo((l) => ({ ...l, [name]: value }));
  }

  let loginActive = activeView === "login";

  const signupFields = (
    <div>
      <div className="form-group">
        <label>First name</label>
        <input
          name="firstName"
          className="form-control"
          value={loginInfo.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last name</label>
        <input
          name="lastName"
          className="form-control"
          value={loginInfo.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={loginInfo.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div className="Login">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
       
        <div className="container">
          <div className="card login-margin">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    name="username"
                    className="form-control"
                    value={loginInfo.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={loginInfo.password}
                    onChange={handleChange}
                  />
                </div>
                {loginActive ? "" : signupFields}
                {loginInfo.errors.length ? (
                  <Alert type="danger" messages={loginInfo.errors} />
                ) : null}

                <Button
                  type="submit"
                  className="btn btn-primary float-right"
                  onSubmit={handleSubmit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
          <div className="d-flex mb-5 mt-5 justify-content-center">
          <div className="btn-group">
            <Button
              className={`btn btn-primary ${loginActive ? "active" : ""} `}
              onClick={setLoginView}
            >
              Login
            </Button>
            <Button
              className={`btn btn-primary ${loginActive ? "" : "active"} `}
              onClick={setSignupView}
            >
              Sign up
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
