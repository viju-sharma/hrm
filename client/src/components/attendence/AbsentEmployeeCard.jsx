import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { addAbsentIDs } from "../../features/absent-slice";
import { privateRequest } from "../../utils/requestMethod";

const AbsentEmployeeCard = (props) => {
  const changeStatus = useSelector((state) => {
    return state.attendance;
  });

  const dispatch = useDispatch();
  const [absentEmployees, setAbsentEmployees] = useState([]);

  const searchValue = props.searchValue;

  // const [absentID, setAbsentID] = useState([]);

  useEffect(() => {
    // get absentEmployees
    privateRequest
      .get("/employee/getAbsentToday")
      .then((result) => {
        setAbsentEmployees(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeStatus]);

  useEffect(() => {
    const absentID = [];
    absentEmployees.forEach((employee) => {
      absentID.push(employee._id);
    });
    dispatch(addAbsentIDs(absentID));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [absentEmployees, changeStatus]);

  const absentEmployeesItems = absentEmployees
    .filter(
      (absent) =>
        absent.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        absent.department.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((employee, index) => {
      //   setAbsentID((absentID) => [...absentID, employee._id]);
      return (
        <SingleCard
          emp_Id={employee._id}
          absent
          key={index}
          fullName={employee.fullName}
          profileImg={employee.profileImg}
        />
      );
    });
  return (
    <Grid columns={3} stackable>
      {absentEmployeesItems}
    </Grid>
  );
};

export default AbsentEmployeeCard;

// remove leaves form list I'll get employee id not leave id,
