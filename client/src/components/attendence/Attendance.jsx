import React, { useState, useEffect } from "react";
import axios from "axios";

import Navigation from "../navigation/Navigation";

import {
  Grid,
  Segment,
  Button,
  Container,
  Image,
  Header,
} from "semantic-ui-react";

const Attendance = (props) => {
  const [Employees, setEmployees] = useState([]);
  const clientToken = sessionStorage.getItem("auth");

  useEffect(() => {
    // getEmployees
    axios
      .get("/user/getUser", { params: { authorization: clientToken } })
      .then((result) => {
        setEmployees(result.data);
      });
  }, [clientToken]);

  const EmployeeCard = () =>
    Employees.map((employee) => {
      const postData = {
        leaveData: {
          date: new Date(),
          reason: "something",
        },
        authorization: clientToken,
        emp_Id: employee._id,
      };

      const addLeave = () => {
        axios
          .post("/employee/addLeave", postData)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      return (
        <Grid.Column>
          <Segment raised>
            <Grid verticalAlign="middle" columns={3} stackable>
              <Grid.Column>
                <Image
                  centered
                  circular
                  size="tiny"
                  src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                />
              </Grid.Column>
              <Grid.Column>
                <Header content={employee.firstname} subheader="2134434" />
              </Grid.Column>
              <Grid.Column>
                <Button
                  compact
                  color="grey"
                  onClick={addLeave}
                  icon="frown outline"
                  circular
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      );
    });

  return (
    <React.Fragment>
      <Navigation active={"attendance"} />

      <Container>
        <Grid columns={3} stackable>
          <EmployeeCard />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Attendance;
