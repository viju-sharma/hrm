import classes from './PayRollTable.module.css';
import React from 'react';

 const payrollCard = (props) => {
     return(
        <div className = {classes.PayRollTable}>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Leaves</th>
                    <th>PayRoll</th>
                </tr>
                {props.children}
            </table>
        </div>
     );
 }

 export default payrollCard;