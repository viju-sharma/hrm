import React from 'react';
import HomeIntro from '../../components/HomePage/HomeIntro/HomeIntro';
import HRSection from '../../components/HomePage/HomeHR/HomeHR';
import EmployeeSection from '../../components/HomePage/HomeEmployee/HomeEmployee';
import Footer from '../../UI/Footer/Footer';
import classes from './HomePage.module.css';

const HomePage = (props) => {
    let someProps = {};
    const footerClasses = [classes.Footer, classes.Div, classes.H2, classes.H3];
    Object.assign(someProps, props.history);
    const history = {};
    Object.assign(history, props.history);

    return (
            <React.Fragment>
                    <HomeIntro />
                    <HRSection pathProps={someProps}/>
                    <EmployeeSection history={history}/>
                <Footer class={footerClasses} />
            </React.Fragment>
            )
}
 
export default HomePage;