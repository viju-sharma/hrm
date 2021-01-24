import React from 'react';
import classes from './DashBoard.module.css';

const employeeDashBoard = (props) => {
    return (
        <div className={classes.Dashboard}>
            <ul className={classes.DashboardList}>
                <li onClick={props.HomeClicked}>Home</li>
                <li onClick={props.ProfileClicked}>Profile</li>
                <li onClick={props.ApplyLeaveClicked}>Apply for Leave</li>
                <li>Apply for Loan</li>
                <li>Request detail update</li>
            </ul>
        </div>
    );
}

export default employeeDashBoard;