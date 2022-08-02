import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "semantic-ui-react";
import Navigation from "../navigation/Navigation";
import Employee from "./Employee";
import ViewEmployee from "../Modal/viewEmployee";
import { openModal } from "../../features/modal-slice";

const AllEmployee = (props) => {
  const [isUpdated, setUpdated] = useState(false);

  const clientToken = sessionStorage.getItem("auth");

  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();

  const [employeeSelected, setEmployee] = useState();
  useEffect(() => {
    axios
      .get("/user/getUser", { params: { authorization: clientToken } })
      .then((result) => {
        setEmployees(result.data);
      });
  }, [clientToken, isUpdated]);

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
      <Navigation active="employees" />
      <Container>
        {employeeSelected && (
          <ViewEmployee
            employee={employeeSelected}
            onClose={handleModalClose}
            updated={() => {
              setUpdated(!isUpdated);
            }}
          />
        )}
        <div id="linkCards" className="ui link cards">
          {Employees}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default AllEmployee;
