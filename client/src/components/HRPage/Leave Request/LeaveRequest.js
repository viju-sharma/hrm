import React from 'react';
//import classes from './LeaveRequest.module.css';
import LeaveRequestCard from '../../../UI/LeaveRequestsCard/LeaveRequestCard';
//import Reveal from 'react-reveal/Reveal';

const leaveRequest = (props) => {

    let leaveReqArray = props.leavesArray;
    let propsArray = []
    for(let obj of leaveReqArray){
        propsArray.push({
            name: obj.name,
            reason: obj.reason,
            dateDuration: new Date(obj.from_date).getDate() + "-" +  (new Date(obj.from_date).getMonth()+1) + "-" + new Date(obj.from_date).getFullYear()
        })
    }

    return (
            <div>
                {propsArray.map((obj, index)=>{
                    return (
                        <React.Fragment key={index}>
                            <LeaveRequestCard {...obj} />
                        </React.Fragment>
                    )
                })}
            </div>
    );
}

export default leaveRequest;