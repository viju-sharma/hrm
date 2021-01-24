import React from 'react';
import classes from './Logo.module.css';

const logo = () => {
    return (
        <div className={classes.Div}>
            <img src="https://i.postimg.cc/g07y1rjc/pngg-vij.png" className={classes.Logo} alt="Logo"></img>
        </div>
        
    );
}

export default logo;