import classes from './SingleEmployee.module.css';
import React,{useState} from 'react';
import {connect} from 'react-redux';
import Backdrop from '../Backdrop/Backdrop';
import * as actionCreaters from '../../Store/ActionCreators';
import axios from 'axios';
import Reveal from 'react-reveal/Reveal';

const leaveFormat = (elType, type, placeHolder, value) => {
    return {
        elementType: elType,
        elementConfig: {
            type: type,
            placeholder: placeHolder
        },
        value: value,
        valid: false,
        touched: false
    }
};

 const SingleEmployee = (props) => {

    
    let selectedEmployee = {};
    let currentEmployeesArray = props.employeesArray;
    let cardClickedID = props.clickedCardID;

    const [showOnModal, setShowOnModal] = useState('employeeDetails');

    for(let obj of currentEmployeesArray){
        if(obj.email === cardClickedID){
            for(let key in obj){
                selectedEmployee[key] = obj[key]
            }
        }
    }


    const [updateForm, setUpdateForm] = useState({
        name: leaveFormat("input", "text", "Name", ""),
        email: leaveFormat("input", "email", "Email", ""),
        contactNumber: leaveFormat("input", "number", "contactNumber", ""),
        team: leaveFormat("input", "text", "Team", ""),
        position: leaveFormat("input", "text", "Position", ""),
        salary: leaveFormat("input", "number", "salary", "" ),
        dateOfBirth: leaveFormat("input", "date", "DOB", ""),
        gender: {
            elementType: "select",
            elementConfig: {
                type: "select",
                options: [
                    {value: "--", displayValue: "--"},
                    {value: "male", displayValue: "Male"},
                    {value: "female", displayValue: 'Female'},
                    {value: "other", displayValue: "Other"}
                ]
            },
            value: "", 
            valid: false,
            touched: false
        },
        address: leaveFormat("input", "textarea", "Address", "")
    })

    //to check if the value to be updated is entered
    const checkValidity = (value) => {
        let isValid = false;

        if(value.trim() !== ""){
            isValid = true;
        }

        return isValid;
    }


    //to Handler input changes in the form
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedEmployeeData = {
            ...updateForm
        }

        const updatedEmployeeDataElement = {
            ...updatedEmployeeData[inputIdentifier]
        }

        updatedEmployeeDataElement.value = event.target.value;
        updatedEmployeeDataElement.valid = checkValidity(updatedEmployeeDataElement.value);
        updatedEmployeeDataElement.touched = true;



        updatedEmployeeData[inputIdentifier] = updatedEmployeeDataElement; 

        setUpdateForm(updatedEmployeeData);  
    }


    //function for sending req to update employee data
    const updateEmployeeData = (event) => {
        event.preventDefault();
        const updatedData = {};
        for(let updateIdentifier in updateForm){
            updatedData[updateIdentifier] = updateForm[updateIdentifier].value;
        }
        let updatedSingleEmployee = {...selectedEmployee};
        for(let key in updatedData){
            if(updatedData[key].trim() !== ""){
                updatedSingleEmployee[key] = updatedData[key]
            }
        }

        axios.post('http://localhost:4000/api/update', updatedSingleEmployee)
        .then((response) => {
            props.toggleModal();
            setShowOnModal('employeeDetails');
            cardClickedID = null;
        })
        .catch(error => error.message);
    }


    // const deleteEmployee = (id) => {
    //     axios.post('', id)
    // }

    const onClickedHandler = () => {
        props.toggleModal();
        setShowOnModal('employeeDetails')
    }

    let employeeModal = null;
    let employeeDetail = null;

    const updateDetailsEmployee = () => {
        setShowOnModal('updateDetails');
    }
    console.log("deleting employee Id",selectedEmployee._id)
    const  deleteEmployeeHandler = ()=>{
        axios.post('http://localhost:4000/api/delete', selectedEmployee._id)
        .then((response) => {
            window.location.reload();
        })
        .catch(error => error.message)
    }



    for(let obj of currentEmployeesArray){
        if(obj.email === cardClickedID){
            employeeDetail = (
                <React.Fragment>
                    <table className={classes.EmployeeDetailTable}>
                        <tr className={classes.TableRow}>
                            <td>Name  :    {obj.name}</td>
                            <td>Email  :   {obj.email}</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <td>Address  :   {obj.address}</td>
                            <td>Contact Number  :   {obj.contactNumber}</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <td>Team  :   {obj.team}</td>
                            <td>Position  :   {obj.position}</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <td>Salary  :   {obj.salary}</td>
                            <td>Gender  :   {obj.gender}</td>
                        </tr>
                        <tr className={classes.TableRow}>
                            <td>Date Of Birth  :   {obj.dateOfBirth}</td>
                        </tr>
                    </table>
                    <button className={classes.updateButton} onClick={updateDetailsEmployee}>Update</button>
                    <button className={classes.deleteButton} onClick={deleteEmployeeHandler}>Delete</button>
                </React.Fragment>
            )
        }
    }

    const formElementArray = [];
    for(let key in updateForm){
        formElementArray.push({
            id: key,
            config: updateForm[key]
        })
    }

    switch(showOnModal){
        case 'employeeDetails':
            employeeModal = employeeDetail;
        break;
        case 'updateDetails':
            employeeModal = (
                <Reveal>
                    <h1 className={classes.UpdateFormHeading}>Enter only details you want to update</h1>
                    <form id="form" className={classes.Form} onSubmit={event => updateEmployeeData(event)}  >
                        {formElementArray.map(formElement => {
                            let input = null;
                            let switchVariable = formElement.config.elementConfig.type;
                            switch(switchVariable){
                                case 'text':
                                    input = <input key={formElement.id}
                                                className={classes.InputElement}
                                                onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                                {...formElement.config.elementConfig} 
                                            />
                                    return input;
                                case 'textarea':
                                    input = <textarea key={formElement.id}
                                                className={classes.textArea}
                                                onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                                {...formElement.config.elementConfig} 
                                                resize="none" >
                                            </textarea>
                                    return input;
                                case 'number':
                                    input = <input key={formElement.id}
                                                className={classes.InputElement}
                                                onChange={event => inputChangedHandler(event, formElement.id)}
                                                {...formElement.config.elementConfig} ></input>
                                    return input;
                                case 'select':
                                    input = <select key={formElement.id}
                                                className={classes.InputElement}
                                                onChange={(event => inputChangedHandler(event, formElement.id))} 
                                                >
                                                    {formElement.config.elementConfig.options.map(option => (
                                                        <option key={option.value} value={option.value} >
                                                            {option.displayValue}
                                                        </option>
                                                    ))}
                                                </select>
                                    return input;
                                case 'email':
                                    input = <input key={formElement.id} 
                                                className={classes.InputElement}
                                                onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                                {...formElement.config.elementConfig} 
                                            />
                                    return input;
                                case 'date':
                                    input = <input key={formElement.id}
                                                className={classes.InputElement}
                                                onChange={event => inputChangedHandler(event, formElement.id)}
                                                {...formElement.config.elementConfig} />
                                    return input;
                                default: 
                                    console.log("Should not go there!");
                            }
                            return input;
                        })}
                        <button type="submit" className={classes.updateDetailsButton}>Update Details</button>
                    </form>   
                </Reveal>
            )
        break;
        default:
            console.log("should not go there!")
        break;
    }

    

     return (
         <React.Fragment>
            <Backdrop show={props.show} />
            <div className={classes.EmployeeDetailModal}
                  style={{ transform: props.show ? ' translateY(0rem)' : 'translateY(-100rem'}}  >
                <div className={classes.CloseModal} onClick={onClickedHandler} ><h4>close</h4></div>
                {employeeModal}

            </div>
         </React.Fragment>
     )
 }
const mapStateToProps = state => {
    return {
        show: state.showEmployeeModal,
        employeesArray: state.employeesArrayMain,
        clickedCardID: state.clickedCardID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(actionCreaters.employeeModalToggle())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SingleEmployee);