import React from 'react';
import classes from './DashBoard.module.css';

const dashBoard = (props) => {
    return (
        <div className={classes.Dashboard}>
            <ul className={classes.DashboardList}>
                <li onClick={props.clickedHome}>Home</li>
                <li onClick={props.clickedLeaveRequests}>Leave Requests</li>
                <li onClick={props.clickedPayrollManage} >Payroll Management</li>
                <li>Loan Management</li>
                <li onClick={props.clickedAddEmployee}>Add New Employee</li>
                <li onClick={props.clickedManageEmployees}>Manage Employees</li>
                <li onClick={props.clickedBenefits}>My Benefits</li>
            </ul>
        </div>
    );
}

export default dashBoard;