import React, { useState } from "react";
import {
  Form,
  Input,
  Grid,
  Button,
  Icon,
  Container,
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
const SignUpForm = () => {
  const [initalValue, setValues] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  let { firstName, lastName, email, password } = initalValue;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/admin/add-user", initalValue).then((response) => {
      console.log(response);
    });
  };
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
                  error={firstName === "" ? true : false}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Last Name</label>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  name="lastName"
                  onChange={handleChange}
                  required
                  icon="user"
                  iconPosition="left"
                  error={lastName === "" ? true : false}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Email</label>
                <Input
                  placeholder="Your Email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  required
                  icon="at"
                  iconPosition="left"
                  error={email === "" ? true : false}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Password</label>
                <Input
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  required
                  icon="key"
                  iconPosition="left"
                  error={password === "" ? true : false}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Button animated="fade" primary size="big">
                <Button.Content visible>Sign up</Button.Content>
                <Button.Content hidden>
                  <Icon name="signup" />
                  Sign up
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link to="/">
                <Button animated size="small">
                  <Button.Content visible>
                    <Icon name="arrow left" />
                    Already Signed up ?
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="signup" />
                    Log In
                  </Button.Content>
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Container>
  );
};

export default SignUpForm;
