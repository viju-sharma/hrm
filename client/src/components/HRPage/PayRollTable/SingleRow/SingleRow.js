import React from 'react';
import classes from './SingleRow.module.css';

const singleRow = (props) => {
    return  (<tr className={classes.SingleRow} >
                <td> {props.name} </td>
                <td> {props.email} </td>
                <td> {props.leaves} </td>
                <td> {props.payroll} </td>
            </tr>)
}

export default singleRow;