import React from 'react'
import EmployeeCard from '../../../UI/EmployeesCard/Employees';
import Reveal from 'react-reveal/Reveal';
import {connect} from 'react-redux';

const employeesCardDiv = (props) =>{ 

    let employeeArray = [];
    for(let key in props.employeesArray){
        employeeArray.push({
            id: key,
            name: props.employeesArray[key].name,
            email: props.employeesArray[key].email,
            employee_id : props.employeesArray[key].employee_id
        })
    }

    return (
        <Reveal>
            {
                employeeArray.map(obj => {
                    return (
                        <EmployeeCard id={obj.email} name={obj.name} email={obj.email} employeeID={obj.employee_id} />
                    )
                })
            }
        </Reveal>
            
        
    );
}

const mapStateToProps = state => {
    return {
        employeesArray: state.employeesArrayMain
    }
}

export default connect(mapStateToProps)(employeesCardDiv);