import React from 'react';
import classes from './LeaveRequestsCard.module.css';

const leaveRequestsCard = (props) => {
    
    return(
        <div className={classes.SingleLeaveRequest}>
            <div className={classes.InnerCard}>
                <div className={classes.CardFront} >
                    <h3>{props.name}</h3>
                    <h3 className={classes.dateHeading}>{props.dateDuration}</h3>
                </div>
                <div className={classes.CardBack}>
                    <p>{props.reason}</p>
                    <div className={classes.buttonContainer}>
                        <div className={classes.ApproveButton}>Approve</div>
                        <div className={classes.RejectButton}>Reject</div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default leaveRequestsCard;