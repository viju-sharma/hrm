import React, { Fragment } from "react";
import classes from "./Home.module.css";
import Navigation from "../navigation/Navigation";
import { Statistic } from "semantic-ui-react";
const Home = () => {
  return (
    <Fragment>
      <Navigation title="Home" />
      <div className={classes.container}>
        <div className={classes.tiles}>
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
