import React, { Fragment, useEffect, useState } from "react";
import classes from "./Home.module.css";
import Navigation from "../navigation/Navigation";
import { Statistic } from "semantic-ui-react";
import { privateRequest } from "../../utils/requestMethod";

const fetchTotalEmployees = async () => {
  try {
    const result = await privateRequest.get("/employee/totalEmployees");
    return result.data.totalEmployees;
  } catch (error) {
    console.log(error);
  }
};

const Home = () => {
  const [totalEmployees, setTotatEmployees] = useState(0);

  useEffect(() => {
    fetchTotalEmployees()
      .then((employees) => setTotatEmployees(employees))
      .catch((error) => console.error());
  }, []);

  return (
    <Fragment>
      <Navigation icon="home" active="dashboard" title="Home" />
      <div className={classes.container}>
        <div className={classes.tiles}>
          <div className={`${classes.tile}`}>
            <div style={{ width: "100%" }}>
              <p>Total Employees</p>
            </div>
            <Statistic inverted className={classes.statistic}>
              <Statistic.Value>{totalEmployees}</Statistic.Value>
              <Statistic.Label>Employees</Statistic.Label>
            </Statistic>
          </div>
          <div className={`${classes.tile}`}>
            <div style={{ width: "100%" }}>
              <p>Total Employees</p>
            </div>
            <Statistic inverted className={classes.statistic}>
              <Statistic.Value>5,550</Statistic.Value>
              <Statistic.Label>Employees</Statistic.Label>
            </Statistic>
          </div>
          <div className={`${classes.tile}`}>
            <div style={{ width: "100%" }}>
              <p>Total Employees</p>
            </div>
            <Statistic inverted className={classes.statistic}>
              <Statistic.Value>5,550</Statistic.Value>
              <Statistic.Label>Employees</Statistic.Label>
            </Statistic>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
