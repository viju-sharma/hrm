import React from 'react';
import classes from './HomeEmployee.module.css';
// import PathComp from '../../../UI/WavyDiv/WavyDiv2';
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';

const homeEmployee = (props) => {

    const onClickHandler = () => {
        props.history.push('/Employee');
    }

    return(
            <div className={classes.Employee}>
                <Fade left>
                    <h1>Are you an Employee?</h1>
                </Fade>
                <Fade right>
                    <p>Help yourself and your organisation grow</p>
                </Fade>
                <Reveal>
                    <button onClick={onClickHandler}><em>LOGIN</em></button>
                </Reveal>
            </div>
    );
}

export default homeEmployee;