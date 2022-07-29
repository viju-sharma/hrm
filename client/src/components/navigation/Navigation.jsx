import React from "react";
import { Input, Menu } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../features/auth-slice";

// main app
const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.user;
  });

  const [activeItem, setActiveItem] = React.useState("home");
  return (
    <Menu secondary>
      <Link to="/">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => {
            setActiveItem("home");
          }}
        />
      </Link>
      {!user && (
        <Link to="/login">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={() => {
              setActiveItem("login");
            }}
          />
        </Link>
      )}
      {!user && (
        <Link to="/signup">
          <Menu.Item
            name="signup"
            active={activeItem === "signup"}
            onClick={() => {
              setActiveItem("signup");
            }}
          />
        </Link>
      )}

      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        {user && (
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={() => {
              setActiveItem("logout");
              dispatch(logout());
              sessionStorage.clear();
            }}
          />
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
