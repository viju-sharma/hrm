import React, { useState } from "react";
import {
  Form,
  Input,
  Grid,
  Button,
  Container,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import classes from "./SignUpForm.module.css";

const SignUpForm = (props) => {
  const user = props.user;
  const [loading, setLoading] = useState(false);
  const [serverRes, setServerRes] = useState();

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
    setServerRes(null);
  };

  let { firstName, lastName, email, password } = initalValue;

  const handleSubmit = (e) => {
    setLoading(true);
    axios
    .post("/auth/signup", initalValue)
    .then((response) => {
        setLoading(false);
        setServerRes({
          type: "success",
          header: "Email sent",
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 406) {
          setServerRes({
            type: "failed",
            header: "Account aleady exists",
            message: err.response.data.message,
          });
          return setLoading(false);
        }
        setServerRes({
          type: "failed",
          header: "Error occured",
          message: err.response.data.message,
        });
        setLoading(false);
      });
    };
    if (!user) {
      return (
        <Container className={`centered ${classes.container}`} text>
        {serverRes && (
          <Message
            warning
            header={serverRes.header}
            content={serverRes.message}
          />
        )}
        <div>

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
                <Button secondary type="submit" loading={loading}>
                  Sign Up
                </Button>
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
        </div>
      </Container>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default SignUpForm;
