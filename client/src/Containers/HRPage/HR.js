import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Dashboard from '../../UI/DashBoard/DashBoard';
import classes from './HR.module.css';
import AddEmployeeModal from '../../UI/Add Employee Modal/AddEmployee';
import Flip from 'react-reveal/Flip';
import Reveal from 'react-reveal/Reveal';
import LeaveRequests from '../../components/HRPage/Leave Request/LeaveRequest'; 
import PayRollTable from '../../components/HRPage/PayRollTable/PayRollTable';
import SingleRow from '../../components/HRPage/PayRollTable/SingleRow/SingleRow';
import EmployeesCardDiv from '../../components/EmployeePage/EmployeesCardDiv/EmployeesCardDiv';
import SingleEmployeeCard from '../../UI/SingleEmployeeDetails/SingleEmployee';
import Benefits from '../../components/Benefits/Main/Benefits';

const HrPage = (props) => {

    const [showOnScreen, setShowOnScreen] = useState('main');

    const [employeesData, setEmployeesData] = useState([]);

  

    useEffect(()=>{
        axios.get("http://localhost:4000/api/employeeDetails")
        .then(res=>{
            if(res){
                setEmployeesData(res.data);
            }
        })
        .catch(err=>err.message)
    }, [])



    let leaveRequestArray = [];


    employeesData.forEach(function(employee){
        let leavereqs = employee.leavereqs;
        leavereqs.forEach(function(leavedate){
            if (leavedate.isRequested){
                leaveRequestArray.push(leavedate);
            }
            
            
        })
    })

    // useEffect(()=>{
    //     setEmployeesData(props.employeesArray);
    // }, [])





    window.scroll(0, 0);

    let hrBody = null;

    let employeesArray = Object.keys(employeesData).map((key) => {
        return employeesData[key];
    }) 

    switch(showOnScreen){
        case 'main':
            hrBody = (
                <React.Fragment>
                    <h1 className={classes.H1}>
                    <Flip left cascade>
                        Welcome HR Name!
                    </Flip>
                </h1>
                <Reveal>
                    <div className={classes.NumberOfEmployeesCard} >
                        <h3 className={classes.ExistingEmployeesHeading}>Current Employees</h3>
                        <h2 className={classes.NumberOfEmployees}>{employeesData.length}</h2>
                        <button className={classes.AddEmployeeButton} onClick={props.toggleModal}>New Recruitment</button>
                    </div>
                </Reveal>
                <Reveal>
                    <div className={classes.RecentActivitiesDiv} >
                        <h3>Acitvities</h3>
                    </div>
                </Reveal>
                </React.Fragment>
            )
        break;
        case 'leaveRequests':
            hrBody = (
                <div className={classes.LeaveRequestCardsContainer}>
                    <LeaveRequests  leavesArray={leaveRequestArray}/>
                </div>
            )
        break;
        case 'payroll':
            hrBody = (
                <Reveal>
                    <div className={classes.PayrollManageDiv}>
                        <PayRollTable>
                        {employeesArray.map(obj=>{
                            return <SingleRow name={obj.name} email={obj.email} leaves="0" payroll="50000" />
                        })}
                        </PayRollTable>
                    </div>
                </Reveal>
                
            )
        break;
        case 'manage_employees':
            hrBody = (
                <Reveal>
                    <div className={classes.EmployeesDiv} >
                        <EmployeesCardDiv  />
                        <SingleEmployeeCard />
                    </div>
                </Reveal>
            )
        break;
        case 'Benefits':
            hrBody = (
                <Reveal>
                    <Benefits />
                </Reveal>
            )
        break;
        default:
            console.log('Should not go there!');
    }

    const onClickLeave = () => {
        setShowOnScreen('leaveRequests');
    } 

    const onClickHome = () => {
        setShowOnScreen('main');
    }

    const onClickPayroll = () => {
        setShowOnScreen('payroll');
    }

    const onClickManageEmployees = () =>{
        setShowOnScreen('manage_employees');
    }

    const onClickBenefits = () => {
        setShowOnScreen('Benefits');
    }

    const hr = (
        <React.Fragment>
            <div className={classes.BackgroundDiv}>
                <div className={classes.Div}>
                    <Dashboard clickedLeaveRequests={onClickLeave} 
                               clickedHome={onClickHome} 
                               clickedAddEmployee={props.toggleModal}
                               clickedPayrollManage={onClickPayroll}
                               clickedManageEmployees={onClickManageEmployees}
                               clickedBenefits={onClickBenefits} />
                </div>
                {hrBody}
            </div>
        </React.Fragment> 
    );

    const historyProps = {...props.history};

    return ( 
        <React.Fragment>
            <AddEmployeeModal history={historyProps} />
            {hr}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        show: state.show,
        employeesArray: state.employeesArrayMain
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModal: () => dispatch({type: "Backdrop_Toggle"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HrPage);