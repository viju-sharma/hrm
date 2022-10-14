import React, { Fragment, useState } from "react";
import { Form, Input, Grid, Button, Message, Divider } from "semantic-ui-react";
import { Link, Navigate } from "react-router-dom";
import classes from "./SignUpForm.module.css";
import { publicRequest } from "../../utils/requestMethod";
import backgroundImage from "../../Images/triangles-1430105.svg";
import { Footer } from "../footer/Footer";
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
    publicRequest
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
      <Fragment>
        <div
          className={classes.mainContainer}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {serverRes && (
            <Message
              warning
              header={serverRes.header}
              content={serverRes.message}
            />
          )}
          <div className={classes.mainDiv}>
            <div className={classes.formDiv}>
              <div className={classes.header}>
                <p>Welcome To The Human Resource Management</p>
                <Divider />
              </div>
              <Form onSubmit={handleSubmit}>
                <Grid stackable columns={2}>
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
                <Grid textAlign="center" columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Button
                        size="large"
                        secondary
                        type="submit"
                        loading={loading}
                        icon="add user"
                        content="Sign Up"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
              <div className="ui horizontal divider">Or</div>
              <div className={classes.haveAccountBtn}>
                <Link to="/login">
                  <button
                    className={`ui animated left button`}
                    type="submit"
                    tabIndex="0"
                  >
                    <div className=" visible content">
                      Already Have Account ?
                    </div>
                    <div className="hidden content">
                      <i className="left arrow icon"></i>Login
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </Fragment>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default SignUpForm;
