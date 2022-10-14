import React from "react";
import classes from "./Footer.module.css";
export const Footer = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainDiv}>
        <p>
          Made with
          <img
            className={classes.heartImg}
            src="/images/give-love.png"
            alt=""
          />
          by Vijender
        </p>
      </div>
    </div>
  );
};
