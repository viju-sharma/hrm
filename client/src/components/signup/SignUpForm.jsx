import React, { useState } from "react";
import { Form, Input, Grid, Button, Icon, Container } from "semantic-ui-react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth-slice";

const SignUpForm = (props) => {
  const user = props.user;

  const dispatch = useDispatch();
  const [initalValue, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  let { firstName, lastName, email, password } = initalValue;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/auth/signup", initalValue).then((response) => {
      response.status === 201 && dispatch(login(response.data.userId));
      console.log(response);
      sessionStorage.setItem("auth", `Bearer ${response.data.token}`);
    });
  };
  if (!user) {
    return (
      <Container text>
        <Form onSubmit={handleSubmit}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>First Name</label>
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    name="firstName"
                    onChange={handleChange}
                    required
                    icon="user"
                    iconPosition="left"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Last Name</label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    name="lastName"
                    onChange={handleChange}
                    required
                    icon="user"
                    iconPosition="left"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Email</label>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    required
                    icon="at"
                    iconPosition="left"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    required
                    icon="key"
                    iconPosition="left"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <button
                  className="ui animated fade button secondary medium"
                  type="submit"
                  tabIndex="0"
                >
                  <div className=" visible content">Sign Up</div>
                  <div className="hidden content">
                    {" "}
                    <i className="user plus icon"></i>
                  </div>
                </button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <div className="ui horizontal divider">Or</div>
        <Link to="/login">
          <button
            className="ui animated left button"
            type="submit"
            tabIndex="0"
          >
            <div className=" visible content">Already Have Account ?</div>
            <div className="hidden content">
              <i className="left arrow icon"></i>Login
            </div>
          </button>
        </Link>
      </Container>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default SignUpForm;
