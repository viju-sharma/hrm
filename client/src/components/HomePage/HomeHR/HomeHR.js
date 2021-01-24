import React from 'react';
import classes from './HomeHr.module.css';
// import PathComponent from '../../../UI/WavyDiv/WavyDiv';
// import LogModal from '../../UI/LoginModal/LoginModal';
// import ScrollAnimation from 'react-animate-on-scroll';
import Fade from 'react-reveal/Fade';

const HrSection = (props) => {

    const loginClicked =() => {
        props.pathProps.push('/HR');
    }

    return (
        <React.Fragment>
            <div className={classes.HRSection}>
                <Fade left>
                <h1>Are you an H R?</h1>
                </Fade>
                <Fade right>
                    <p>Manage your resources from a single place in an efficient and effective way</p>
                </Fade>
                    <button className={classes.Button} onClick={loginClicked}><em>LOGIN</em></button>
            </div>
                {/* <PathComponent class={classes.WavyDiv} ></PathComponent>
                <p className={classes.Para}>Manage your resources anywhere easily</p> */}
        </React.Fragment>
        
    );
}

export default HrSection;