import React, { useState } from "react";
import { Container, Dropdown } from "semantic-ui-react";
import { countryOptions, stateOptions } from "../../utils/util";
import Navigation from "../navigation/Navigation";
import { privateRequest } from "../../utils/requestMethod";
const AddEmployee = (props) => {
  // check show success after user added
  const [isAdded, setAdded] = useState(false);

  //show falure
  const [isFailed, setFailed] = useState(false);

  const emptyField = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    streetAdd: "",
    pincode: "",
    state: "",
    country: "",
    department: "",
    salary: "",
  };
  const [initialValue, setValues] = useState(emptyField);

  const handleChange = (e, result) => {
    setFailed(false);
    setAdded(false);
    const { name, value } = result || e.target;
    setValues((values) => ({ ...values, [name]: value }));
  };
  const user = props.user;
  const postData = {
    employee: initialValue,
    userId: user,
  };

  const handleSubmit = (e) => {
    if (
      initialValue.firstname === "" ||
      initialValue.lastname === "" ||
      initialValue.email === "" ||
      initialValue.mobile === "" ||
      initialValue.streetAdd === "" ||
      initialValue.pincode === "" ||
      initialValue.state === "" ||
      initialValue.country === "" ||
      initialValue.department === "" ||
      initialValue.salary === ""
    ) {
      e.preventDefault();
      alert("Please fill all details");
    } else {
      e.preventDefault();
      privateRequest.post("/employee/addEmployee", postData).then((response) => {
        if (response.status === 200) {
          setAdded(true);
          setValues(emptyField);
        } else {
          setFailed(true);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Navigation active="addemployee" />
      <Container>
        {isAdded && (
          <div className="ui success message">
            <div className="header">Employee Added</div>
            <p>Employee was added successfully.</p>
          </div>
        )}
        {isFailed && (
          <div className="ui error message">
            <div className="header">Invalid Data provided</div>
            <p>Please check all the fields</p>
          </div>
        )}
        <form className="ui form " onSubmit={handleSubmit}>
          <h4 className="ui dividing header">Employee Information</h4>
          <div className="field">
            <label>Name</label>
            <div className="two fields">
              <div className="field">
                <input
                  autoFocus
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                  value={initialValue.firstname}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                  value={initialValue.lastname}
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
                  value={initialValue.department}
                />
              </div>
              <div className="field">
                <label>Salary</label>
                <input
                  maxLength={10}
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  required
                  onChange={handleChange}
                  value={initialValue.salary}
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
                  value={initialValue.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="four wide field">
                <label>Contact</label>
                <input
                  name="mobile"
                  type="number"
                  maxLength={10}
                  placeholder="Contact No."
                  required
                  onChange={handleChange}
                  value={initialValue.mobile}
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
                  value={initialValue.streetAdd}
                />
              </div>
              <div className="four wide field">
                <label>Pincode</label>
                <input
                  type="number"
                  maxLength={6}
                  name="pincode"
                  onChange={handleChange}
                  value={initialValue.pincode}
                  placeholder="Pincode"
                />
              </div>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>State</label>
              <Dropdown
                name="state"
                placeholder="Select State"
                fluid
                search
                selection
                options={stateOptions}
                value={initialValue.state}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Country</label>
              <Dropdown
                placeholder="Select Country"
                fluid
                search
                selection
                options={countryOptions}
                name="country"
                value={initialValue.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="ui button secondary" tabIndex="0" type="submit">
            Add Employee
          </button>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default AddEmployee;
