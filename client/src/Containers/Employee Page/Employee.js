import axios from 'axios';
import React, {useEffect, useState} from 'react';
import classes from './Employee.module.css';
import Reveal from 'react-reveal/Reveal';
import DashBoard from '../../UI/DashBoard/EmoloyeeDashBoard';
import Footer from '../../UI/Footer/Footer';
import Flip from 'react-reveal/Flip';
import ApplyForLeave from '../../components/EmployeePage/ApplyLeave/ApplyLeave';

const Employee = () => {

    const [showOnScreen, setShowOnScreen] = useState('main');
    const [employeeData, setEmployeeData] = useState([]);
    let employeePageBody = null;
    const hrFooterClass = [classes.Footer, classes.footerDiv, classes.H2, classes.H3];

    useEffect(() => {
        axios.get("http://localhost:4000/api/employeeDetails")
        .then(response => {
            let fetchedEmployeeData = [];
            for(let key in response.data){
                fetchedEmployeeData.push({
                    ...response.data[key],
                    id: key
                })
            }
            setEmployeeData(fetchedEmployeeData);
        })
    }, [])

    const singleEmployee = {
        ...employeeData[0]
    }

    const onClickProfile = () => {
        setShowOnScreen('profileLoad');
    }

    const onClickHome = () => {
        setShowOnScreen('main');
    }
    const onClickApplyLeave = () => {
        setShowOnScreen('applyLeaveLoad');
    }

    switch(showOnScreen){
        case 'main':
            employeePageBody = (
                <React.Fragment>
                    <h1 className={classes.WelcomeHeading}>
                        <Flip left cascade>
                            WELCOME
                        </Flip>
                    </h1>
                </React.Fragment>
            )
            break;
        case 'profileLoad':
            employeePageBody = (
                    <div className={classes.ProfileDivOnLoad}>
                        <Reveal>
                            <h5 className={classes.DetailsHeading}>Name : {singleEmployee.name}</h5>
                            <h5 className={classes.DetailsHeading}>Email : {singleEmployee.email}</h5>
                            <h5 className={classes.DetailsHeading}>Contact number : {singleEmployee.contactNumber}</h5>
                            <h5 className={classes.DetailsHeading}>Address : {singleEmployee.address}</h5>
                            <h5 className={classes.DetailsHeading}>Team : {singleEmployee.team}</h5>
                            <h5 className={classes.DetailsHeading}>Position : {singleEmployee.position}</h5>
                        </Reveal>
                    </div>
            )
            break;
        case 'applyLeaveLoad':
            employeePageBody = (
                    <div className={classes.ApplyLeaveDiv}>
                        <Reveal>
                            <ApplyForLeave />
                        </Reveal>
                    </div>
            )
            break;
        default: 
            console.log("Should not go there!");
    }

    return(
        <React.Fragment>
            <div className={classes.BackgroundDiv}>
                <div className={classes.DashBoardDiv}>
                    <DashBoard ProfileClicked={onClickProfile} HomeClicked={onClickHome} ApplyLeaveClicked={onClickApplyLeave} />
                </div>
                {employeePageBody}
            </div>
            <Footer class={hrFooterClass} />
        </React.Fragment>
        
    );
}

export default Employee;