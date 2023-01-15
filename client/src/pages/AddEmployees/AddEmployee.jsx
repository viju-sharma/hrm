import React, { useRef, useState, useEffect } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { countryOptions, stateOptions } from "../../utils/util";
import { privateRequest } from "../../utils/requestMethod";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import Navigation from "../../components/navigation/Navigation";

const AddEmployee = (props) => {
  const profileImageRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  const [imageuploadLoading, setImageUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // check show success after user added
  const [isAdded, setAdded] = useState(false);

  //show falure
  const [isFailed, setFailed] = useState(false);

  const emptyField = {
    fullName: "",
    profileImg: "",
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

  const handleSubmit = async (e) => {
    setLoading(true);

    try {
      if (
        initialValue.fullName === "" ||
        initialValue.profileImg === "" ||
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
        setLoading(false);
        return alert("Please fill all details");
      }
      e.preventDefault();
      await privateRequest
        .post("/api/employee/addEmployee", postData)
        .then(() => {
          setAdded(true);
          setValues(emptyField);
          setImageFile(null);
          return setLoading(false);
        });
    } catch (error) {
      alert(error.message);
      setFailed(true);
      return setLoading(false);
    }
  };

  // upload Image to Firebase
  const uploadImageToFirebase = async () => {
    setImageUploadLoading(true);
    try {
      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name + uuidv4()}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        const url = await getDownloadURL(snapshot.ref);
        setValues((values) => ({ ...values, profileImg: url }));
        return setImageUploadLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      return setImageUploadLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Navigation icon="add user" title="Add Employee" active="addemployee" />
      <div className="max-w-[100rem] m-auto p-16">
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
          <div className="two fields">
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                onChange={handleChange}
                value={initialValue.fullName}
              />
            </div>
            <div className="field">
              <label>Profile Image</label>
              <div className="ui action input">
                <input
                  required
                  type="text"
                  readOnly
                  value={imageFile ? imageFile.name : ""}
                  placeholder="None"
                />
                {imageFile ? (
                  <Button
                    disabled={
                      initialValue.profileImg !== "" || imageuploadLoading
                    }
                    loading={imageuploadLoading}
                    icon={initialValue.profileImg === "" ? "upload" : "check"}
                    className="ui button"
                    color={initialValue.profileImg === "" ? "blue" : "green"}
                    onClick={uploadImageToFirebase}
                    content={
                      initialValue.profileImg === ""
                        ? "Upload Image"
                        : "Uploaded"
                    }
                  ></Button>
                ) : (
                  <button
                    className="ui button"
                    onClick={(e) => {
                      e.preventDefault();
                      profileImageRef.current.click();
                    }}
                  >
                    Browse Image
                  </button>
                )}
              </div>
              <input
                ref={profileImageRef}
                name="profileImage"
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
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
          <div>
            <Button
              disabled={loading}
              loading={loading}
              icon="plus"
              content=" Add Employee"
              className="ui button secondary"
              type="submit"
            ></Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddEmployee;
