import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Input } from "semantic-ui-react";
import classes from "./PasswordRecovery.module.css";

const PasswordRecovery = () => {
  document.title = "Change Password";
  const params = useParams();
  const { id, email, token } = params;

  const [isError, setIsError] = useState(false);

  const [inputValue, setInputValue] = useState({
    input1: "",
    input2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((values) => {
      return { ...values, [name]: value };
    });
    setIsError(false);
  };

  const handleSubmit = async () => {
    if (inputValue.input1 === "" || inputValue.input2 === "")
      return setIsError(true);
    if (inputValue.input1 !== inputValue.input2) return setIsError(true);
    try {
      const response = await axios.post("/verify/changePassword", {
        id,
        token,
        password: inputValue.input1,
      });

      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.main}>
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
    </React.Fragment>
  );
};

export default PasswordRecovery;
