import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import classes from "./PasswordRecovery.module.css";
import MessageResponse from "../../utils/Message";

const PasswordRecovery = () => {
  const navigate = useNavigate();
  document.title = "Change Password";
  const params = useParams();
  const { id, email, token } = params;

  const [isError, setIsError] = useState(false);

  const [inputValue, setInputValue] = useState({
    input1: "",
    input2: "",
  });

  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((values) => {
      return { ...values, [name]: value };
    });
    setIsError(false);
    setResponse();
  };

  const handleSubmit = async () => {
    // return console.log(inputValue);
    if (inputValue.input1 === "" || inputValue.input2 === "") {
      setResponse({
        header: "Password Can Not Be Empty",
        content: "Please re enter your passord",
        color: "red",
      });
      return setIsError(true);
    }
    if (inputValue.input1 !== inputValue.input2) {
      setResponse({
        header: "Password did not match",
        content: "Please re enter your passord",
        color: "red",
      });
      return setIsError(true);
    }
    try {
      const response = await axios.post("/verify/changePassword", {
        id,
        clientToken: token,
        password: inputValue.input1,
      });
      const { title, message } = response.data;
      setResponse({
        header: title,
        content: message + " Redirecting in 5 sec",
        color: "green",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      const { title, message } = error.response.data;
      setResponse({ header: title, content: message, color: "red" });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.main}>
        <div className={classes.message}>
          {response && (
            <MessageResponse
              color={response.color}
              content={response.content}
              header={response.header}
            />
          )}
        </div>
        <div className={classes.container}>
          <p>{"Hello, " + email}</p>
          <span>Please Enter Your New Password</span>
          <div className={classes.inputDiv}>
            <Input
              value={inputValue.input1}
              name="input1"
              type="password"
              error={isError}
              icon="key"
              iconPosition="left"
              fluid
              placeholder="Enter New Password"
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputDiv}>
            <Input
              value={inputValue.input2}
              name="input2"
              type="password"
              error={isError}
              icon="key"
              iconPosition="left"
              fluid
              placeholder="Confirm Your Password"
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputDiv}>
            <Button
              onClick={handleSubmit}
              fluid
              animated="fade"
              color="instagram"
            >
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>Change Password</Button.Content>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PasswordRecovery;
