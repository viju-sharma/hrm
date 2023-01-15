import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth-slice";
import classes from "./Loginpage.module.css";
import ForgotPassword from "./ForgotPassword";
import Typewriter from "typewriter-effect";
import { publicRequest } from "../../utils/requestMethod";
import backgroundImg from "../../Images/triangles-1430105.svg";
import { Footer } from "../footer/Footer";
import { Divider } from "semantic-ui-react";
const LoginPage = (props) => {
  const [isErr, setErr] = useState();
  const dispatch = useDispatch();
  const user = props.user;
  const [initialValue, setValues] = useState({
    email: "testing@gmail.com",
    password: "testing12345",
  });

  const handleChange = (e) => {
    setErr("");
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  let { email, password } = initialValue;
  const handleSubmit = (e) => {
    e.preventDefault();
    publicRequest
      .post("/api/auth/login", initialValue)
      .then((response) => {
        response.status === 200 && dispatch(login(response.data.userId));
      })
      .catch((err) => {
        const message = err.response.data.message
          ? err.response.data.message
          : "unknown error";
        if (err.response.status === 400) {
          setErr({
            type: "medium",
            header: "Account Verification Required ",
            message: message,
          });
        } else if (err.response.status === 404) {
          setErr({
            type: "critical",
            header: "Incorrect Credentials",
            message: message,
          });
        } else {
          setErr({
            type: "critical",
            header: "System Error",
            message: message,
          });
        }
        setValues({ email: "", password: "" });
      });
  };

  const showForgotPassword = () => {};
  if (!user) {
    return (
      <div
        className={classes.mainContainer}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className={classes.loginBlock}>
          {isErr && (
            <div
              className={`ui ${
                isErr.type === "medium" ? "purple" : "red"
              } message`}
            >
              <div className="header">{isErr.header}</div>
              <p>{isErr.message}</p>
            </div>
          )}
          <div className={classes.header}>
            <p>Welcome Back To Human Resource Management</p>
            <Divider />
          </div>
          <div className="ui form">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className={classes.label}>Username</label>
                <div className={`ui left icon input ${isErr}`}>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                  <i className="user icon"></i>
                </div>
              </div>
              <div className="field">
                <label className={classes.label}>Password</label>
                <div className={`ui left icon input ${isErr}`}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <i className="lock icon"></i>
                </div>
              </div>
              <button className="ui blue submit fluid button" type="submit">
                Login
              </button>
            </form>
            <div
              className={classes.forgotPassword}
              onClick={showForgotPassword}
            >
              <ForgotPassword />
            </div>
          </div>
          <div className={`ui horizontal divider ${classes.divider}`}>Or</div>
          <div className={classes.signUpBtn}>
            <Link to="/signup">
              <div className="ui animated fade button" tabIndex="1">
                <div className="visible content">Don't have account ?</div>
                <div className="hidden content">Sign Up</div>
              </div>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default LoginPage;
