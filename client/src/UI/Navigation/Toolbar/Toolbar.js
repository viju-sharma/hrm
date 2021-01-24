import React from 'react';
import NavigationItems from '../NavigationItems/NavigaitonItems';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <Logo />
            <nav>
                <NavigationItems /> 
            </nav>
        </header>
    );
}

export default toolbar;