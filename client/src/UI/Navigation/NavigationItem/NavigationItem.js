import React from 'react';
import classes from './NavigationItem.module.css'

const navigationItems = (props) => 
    (
        <li className={classes.NavItem}>
            <a href={props.link}>{props.children}</a>
        </li>
    );

export default navigationItems;