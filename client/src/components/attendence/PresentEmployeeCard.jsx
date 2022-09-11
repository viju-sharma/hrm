import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";
import { Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { isChanged } from "../../features/attendence-slice";

const PresentEmployeeCard = (props) => {
  const dispatch = useDispatch();
  const [Employees, setEmployees] = useState([]);

  const clientToken = sessionStorage.getItem("auth");
  const absentIDs = props.absentIDs;
  // useSelector((state) => {
  //   return state.absentIDs.IDs;
  // });
  const searchValue = props.searchValue;

  const changeStatus = useSelector((state) => {
    return state.attendance;
  });

  useEffect(() => {
    // getAllEmployees
    axios
      .get("/user/getUser", { params: { authorization: clientToken } })
      .then((result) => {
        setEmployees(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clientToken]);

  const EmployeesItems = Employees.filter(
    (employee) =>
      employee.firstname.includes(searchValue) ||
      employee.lastname.includes(searchValue) ||
      employee.department.includes(searchValue)
  ).map((employee) => {
    const slicedDate = new Date().toJSON().slice(0, 10).toString();
    const postData = {
      leaveData: {
        date: slicedDate,
        reason: "something",
        firstname: employee.firstname,
        lastname: employee.lastname,
        department: employee.department,
      },
      authorization: clientToken,
      emp_Id: employee._id,
    };

    const addLeave = () => {
      axios
        .post("/employee/addLeave", postData)
        .then((result) => {
          dispatch(isChanged());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <SingleCard
        absent={absentIDs.includes(employee._id)}
        key={employee._id}
        firstName={employee.firstname}
        addLeave={addLeave}
        emp_Id={employee._id}
      />
    );
  });
  return (
    <Grid columns={3} stackable>
      {EmployeesItems}
    </Grid>
  );
};

export default PresentEmployeeCard;