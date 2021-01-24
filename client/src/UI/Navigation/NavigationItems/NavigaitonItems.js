import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/">About us</NavigationItem>
            <NavigationItem link="/HR">HR Manager</NavigationItem>
            <NavigationItem link="/Employee">Employee</NavigationItem>
        </ul>
    );
}

export default navItems;