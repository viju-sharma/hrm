import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Image, Grid, Icon, Header } from "semantic-ui-react";
import { closeModal } from "../../features/modal-slice";
import axios from "axios";

const ViewEmployee = (props) => {
  const [secondOpen, setSecondOpen] = useState(false);

  const employee = props.employee;

  const clientToken = sessionStorage.getItem("auth");

  const [initialValues, setInitialValues] = useState(employee);

  const modalState = useSelector((stores) => stores.modal);

  const { open, dimmer } = modalState;
  const dispatch = useDispatch();

  // check show success after user added
  const [isAdded, setAdded] = useState(false);

  //show falure
  const [isFailed, setFailed] = useState(false);

  const handleChange = (e, result) => {
    setFailed(false);
    setAdded(false);
    const { name, value } = result || e.target;
    setInitialValues((values) => ({ ...values, [name]: value }));
  };

  const handleDelete = () => {
    const config = { headers: { authorization: clientToken } };
    axios
      .post(
        "/employee/deleteEmployee",
        {
          userId: employee._id,
        },
        config
      )
      .then(() => {
        props.updated();
        setSecondOpen(false);
        dispatch(closeModal());
        props.onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    if (
      initialValues.firstname === "" ||
      initialValues.lastname === "" ||
      initialValues.email === "" ||
      initialValues.mobile === "" ||
      initialValues.streetAdd === "" ||
      initialValues.pincode === "" ||
      initialValues.state === "" ||
      initialValues.country === "" ||
      initialValues.department === "" ||
      initialValues.salary === ""
    ) {
      alert("Please fill all details");
    } else {
      const config = { headers: { authorization: clientToken } };
      const postData = {
        employee: initialValues,
      };
      e.preventDefault();
      axios
        .post("/employee/editEmployee", postData, config)
        .then((response) => {
          if (response.status === 200) {
            setAdded(true);
            props.updated();
          } else {
            setFailed(true);
          }
        });
    }
  };

  return (
    <div>
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => {
          dispatch(closeModal());
          props.onClose();
        }}
      >
        <Modal.Header>
          <Grid>
            <Grid.Column floated="left" width={5}>
              <div>
                {employee.firstname.toUpperCase() +
                  " " +
                  employee.lastname.toUpperCase()}
              </div>
            </Grid.Column>
            {isAdded && (
              <Grid.Column floated="right" width={9}>
                <div className="ui success message">
                  Employee was added successfully.
                </div>
              </Grid.Column>
            )}

            {isFailed && (
              <Grid.Column floated="right" width={8}>
                <div className="ui error message">
                  <p>Please check all the fields</p>
                </div>
              </Grid.Column>
            )}
          </Grid>
        </Modal.Header>
        <Modal.Content image>
          <Image
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            wrapped
          />
          <Modal.Description>
            <form className="ui form " onSubmit={handleSubmit}>
              <h4 className="ui dividing header">Employee Information</h4>
              <div className="field">
                <label>Name</label>
                <div className="two fields">
                  <div className="field">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      required
                      onChange={handleChange}
                      value={initialValues.firstname}
                    />
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      required
                      onChange={handleChange}
                      value={initialValues.lastname}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="two fields">
                  <div className="field">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      placeholder="Department"
                      required
                      onChange={handleChange}
                      value={initialValues.department}
                    />
                  </div>
                  <div className="field">
                    <label>Salary</label>
                    <input
                      type="text"
                      name="salary"
                      placeholder="Salary"
                      required
                      onChange={handleChange}
                      value={initialValues.salary}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="fields">
                  <div className="twelve wide field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={initialValues.email}
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="eight wide field">
                    <label>Contact</label>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Contact No."
                      required
                      onChange={handleChange}
                      value={initialValues.mobile}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="fields">
                  <div className="twelve wide field">
                    <label>Address</label>
                    <input
                      type="text"
                      name="streetAdd"
                      placeholder="Street Address"
                      onChange={handleChange}
                      value={initialValues.streetAdd}
                    />
                  </div>
                  <div className="six wide field">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      onChange={handleChange}
                      value={initialValues.pincode}
                      placeholder="Pincode"
                    />
                  </div>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Street Address"
                    onChange={handleChange}
                    value={initialValues.state}
                  />
                </div>
                <div className="field">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Street Address"
                    onChange={handleChange}
                    value={initialValues.country}
                  />
                </div>
              </div>

              <button
                className="ui button secondary"
                tabIndex="0"
                type="submit"
              >
                Edit Employee Details
              </button>
            </form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Delete"
            labelPosition="left"
            icon="delete"
            onClick={() => {
              setSecondOpen(true);
            }}
            negative
          />
          <Button
            content="Done"
            labelPosition="right"
            icon="checkmark"
            onClick={() => dispatch(closeModal())}
            positive
          />
        </Modal.Actions>
        <Modal
          basic
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size="small"
        >
          <Header icon>
            <Icon name="user delete" />
            Delete Employee ?
          </Header>
          <Modal.Content>
            <p>
              Are you sure, You want to delete this employee ? All of his data
              will be lost after this action. Please be sure.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              inverted
              onClick={() => setSecondOpen(false)}
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={handleDelete}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Modal>
    </div>
  );
};

export default ViewEmployee;
