import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navigation from "../navigation/Navigation";
import Employee from "./Employee";
import ViewEmployee from "../Modal/viewEmployee";
import { openModal } from "../../features/modal-slice";
import { privateRequest } from "../../utils/requestMethod";

const AllEmployee = (props) => {
  const [isUpdated, setUpdated] = useState(false);

  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();

  const [employeeSelected, setEmployee] = useState();
  useEffect(() => {
    privateRequest.get("/employee/getEmployees").then((result) => {
      setEmployees(result.data);
    });
  }, [isUpdated]);

  // let navigate = useNavigate();
  const handleModalClose = () => {
    setEmployee();
  };
  const Employees = employees.map((employee) => {
    return (
      <Employee
        key={employee._id}
        onClick={() => {
          dispatch(openModal({ dimmer: "blurring" }));
          setEmployee(employee);
        }}
        employee={employee}
      />
    );
  });

  return (
    <React.Fragment>
      <Navigation
        icon="id card"
        active="employees"
        title="All Employees"
        search
      />
      {employeeSelected && (
        <ViewEmployee
          employee={employeeSelected}
          onClose={handleModalClose}
          updated={() => {
            setUpdated(!isUpdated);
          }}
        />
      )}
      <div style={{ textAlign: "center" }}>{Employees}</div>
    </React.Fragment>
  );
};

export default AllEmployee;
