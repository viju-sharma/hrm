import { useState, useEffect, Fragment } from "react";
import Navigation from "../navigation/Navigation";
import classes from "./Profile.module.css";
import backgroundImage from "../../Images/triangles-1430105.svg";
const Profile = () => {
  return (
    <Fragment>
      <Navigation />
      <div
        className={classes.mainContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </Fragment>
  );
};

export default Profile;
