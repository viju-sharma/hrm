import React from "react";
import { useDispatch } from "react-redux";
import { Button, Container } from "semantic-ui-react";
import Navigation from "../navigation/Navigation";
import { logout } from "../../features/auth-slice";
const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Navigation />
      <Container>
        <h1>this is home page we have to protect</h1>
        <Button
          onClick={() => {
            sessionStorage.clear();
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </Container>
    </div>
  );
};
export default Home;
