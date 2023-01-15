import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import { Grid } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { isChanged } from "../../features/attendence-slice";
import { privateRequest } from "../../utils/requestMethod";

const PresentEmployeeCard = (props) => {
  const dispatch = useDispatch();
  const [Employees, setEmployees] = useState([]);

  const absentIDs = props.absentIDs;
  // useSelector((state) => {
  //   return state.absentIDs.IDs;
  // });
  const searchValue = props.searchValue;

  // const changeStatus = useSelector((state) => {
  //   return state.attendance;
  // });

  useEffect(() => {
    // getAllEmployees
    privateRequest
      .get("/api/employee/getEmployees")
      .then((result) => {
        setEmployees(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const EmployeesItems = Employees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchValue.toLowerCase())
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
      emp_Id: employee._id,
    };

    const addLeave = () => {
      privateRequest
        .post("/api/employee/addLeave", postData)
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
        fullName={employee.fullName}
        addLeave={addLeave}
        emp_Id={employee._id}
        profileImg={employee.profileImg}
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
