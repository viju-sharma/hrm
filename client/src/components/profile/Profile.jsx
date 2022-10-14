import { useState, useEffect, Fragment } from "react";
import Navigation from "../navigation/Navigation";
import classes from "./Profile.module.css";
import backgroundImage from "../../Images/triangles-1430105.svg";
const Profile = () => {
  return (
    <Fragment>
      <Navigation title="Profile" icon="user outline" />
      <div
        className={classes.mainContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={classes.mainDiv}>
          <div>
            <img src="" alt="Profile" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
