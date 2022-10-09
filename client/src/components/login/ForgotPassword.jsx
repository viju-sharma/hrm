import React, { useState } from "react";
import { Button, Header, Icon, Input, Modal, Message } from "semantic-ui-react";
import classes from "./ForgotPassword.module.css";
import { publicRequest } from "../../utils/requestMethod";

const ResponseMessage = (props) => {
  const message = props.message;
  return (
    <div className={props.className}>
      <Message
        color={message.color ? message.color : "yellow"}
        icon={message.icon ? message.icon : "bug"}
        header={message.title ? message.title : "Unknown Error"}
        content={
          message.message
            ? message.message
            : "Unable To Perform Recovery Right Now. Please Try Again After Some Time"
        }
      />
    </div>
  );
};

function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [isError, setError] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [isMessage, setMessage] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (regex.test(recoveryEmail) === false) {
      setMessage({
        icon: "exclamation circle",
        color: "red",
        type: "failure",
        title: "Invalid Email",
        message: "Please Enter a Valid Email Address",
      });
      return setError(true);
    }
    try {
      setLoading(true);
      const response = await publicRequest.post("/verify/forgetPassword", {
        email: recoveryEmail,
      });
      setMessage({
        icon: "mail",
        color: "green",
        type: "success",
        title: "Successful",
        message: response.data.message,
      });
      setRecoveryEmail("");
      setLoading(false);
    } catch (error) {
      setError(true);

      setMessage({
        icon: "exclamation circle",
        color: "red",
        type: "failure",
        title: "Failed",
        message: error.response.data.message,
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRecoveryEmail(e.target.value);
    setError(false);
    setMessage();
  };

  return (
    <Modal
      dimmer="blurring"
      className={classes.modal}
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      trigger={<div className="cursorPointer">forgot password?</div>}
    >
      <Header icon>
        <Icon
          name="unlock alternate"
          className={isLoading ? "rotateInfinity" : ""}
        />
        Forgot Password ?
      </Header>
      <Modal.Content>
        <p>Enter Your Email Address</p>
        <Input
          value={recoveryEmail}
          autoFocus
          error={isError}
          type="email"
          icon={"mail"}
          iconPosition="left"
          fluid
          name="recoveryEmail"
          placeholder="Please Enter Your Email Address"
          onChange={handleChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> Close
        </Button>
        <Button
          disabled={isLoading}
          loading={isLoading}
          color="green"
          inverted
          onClick={handleSubmit}
        >
          <Icon name="checkmark" /> Send
        </Button>
      </Modal.Actions>
      <Modal.Description>
        <p>*An email will be sent to the user to recover their password</p>
        {isMessage && (
          <ResponseMessage className={classes.response} message={isMessage} />
        )}
      </Modal.Description>
    </Modal>
  );
}

export default ForgotPassword;
