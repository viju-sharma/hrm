import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../features/auth-slice";

// main app
const Navigation = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.user;
  });

  const logoutFun = () => {
    dispatch(logout());
  };

  return (<React.Fragment>

    <div className="ui secondary  menu">
      <Link to="/">
        <div className={`item ${props.active === "home" && "active"}`}>
          Home
        </div>
      </Link>
      <Link to="/addEmployee">
        <div className={`item ${props.active === "addemployee" && "active"}`}>
          Add Employee
        </div>
      </Link>
      <Link to="/employees">
        <div className={`item ${props.active === "employees" && "active"}`}>
          Employees
        </div>
      </Link>
      <Link to="/attendance">
        <div className={`item ${props.active === "attendance" && "active"}`}>
          Attendance
        </div>
      </Link>
      {!user && (
        <Link to="/login">
          <div className={`item ${props.active === "login" && "active"}`}>
            Login
          </div>
        </Link>
      )}
      {!user && (
        <Link to="/signup">
          <div className={`item ${props.active === "signup" && "active"}`}>
            Signup
          </div>
        </Link>
      )}
      <div className="right menu">
        <div className="item">
          <i className="power off icon" onClick={logoutFun}></i>
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Navigation;
