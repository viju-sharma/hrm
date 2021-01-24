import React, {useState} from 'react';
import {connect} from 'react-redux';
import classes from './AddEmployeeForm.module.css';
import axios from 'axios';
// import {Fade} from 'react-awesome-reveal';
// import * as actionCreaters from '../../Store/ActionCreators';

const employeeInfoFormat = (elType, type, placeHolder, value, validation) => {
    return {
        elementType: elType,
        elementConfig: {
            type: type,
            placeholder: placeHolder
        },
        value: value,
        validation: validation,
        valid: false,
        touched: false
    }
};

const AddEmployeeForm = (props) => {
    
    //Adding Employee State
    const [addEmployeeForm, setaddEmployeeForm] = useState({
        name: employeeInfoFormat("input", "text", "Name", "", {required: true}),
        email: employeeInfoFormat("input", "email", "Email", "", {required: true}),
        contactNumber: employeeInfoFormat("input", "number", "Contact number", "", {required: true, minLength: 10, maxLength: 10}),
        team: employeeInfoFormat("input", "text", "Team", "", {required: true}),
        position: employeeInfoFormat("input", "text", "Position","", {required: true}),
        salary: employeeInfoFormat("input", "number", "Salary", "", {required: true}),
        dateOfBirth: employeeInfoFormat("input", "date", "Date Of Birth", "", {required: true}),
        gender: {
            elementType: "select",
            elementConfig: {
                type: "select",
                options: [
                    {value: "male", displayValue: "Male"},
                    {value: "female", displayValue: 'Female'},
                    {value: "other", displayValue: "Other"}
                ]
            },
            value: "",
            validation: {
                required: true
            }, 
            valid: true,
            touched: true
        },
        address: employeeInfoFormat("input", "textarea", "Address", "", {required: true})
    }); 

    //whether form is valid or not
    const [formIsValid, setFormIsValid] = useState(false);

    //to check if the input field is valid
    const checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.minLength && isValid;
        }
        
        return isValid;
    }
    
    // const buttonEnabledHandler = () => {
        
    // }

    //for handling input change in an input field
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedEmployeeData = {
            ...addEmployeeForm
        }


        const updatedEmployeeDataElement = {
            ...updatedEmployeeData[inputIdentifier]
        }


        updatedEmployeeDataElement.value = event.target.value;
        updatedEmployeeDataElement.valid = checkValidity(updatedEmployeeDataElement.value, updatedEmployeeDataElement.validation);
        updatedEmployeeDataElement.touched = true;
        updatedEmployeeData[inputIdentifier] = updatedEmployeeDataElement; 
        
        let formNowValid = true;
        for(let key in updatedEmployeeData){
            formNowValid = updatedEmployeeData[key].valid && formNowValid;
        }

        setaddEmployeeForm(updatedEmployeeData);
        setFormIsValid(formNowValid);
        
    }


    //function that will be exected when the form is submitted
    const employeeAddedHandler = (event) => {
        event.preventDefault();
        const employeeData = {};
        for(let employeeDataIdentifier in addEmployeeForm){
            employeeData[employeeDataIdentifier] = addEmployeeForm[employeeDataIdentifier].value;
        }

        axios.post('http://localhost:4000/api/addemployee', employeeData)
        .then((response) => {
            window.location.reload();
        })
        .catch(error => error.message);
    }


    //Arrays of employees attributes i.e. name, address, email, etc. for mapping them to the add employee form
    const formElementArray = [];
    for(let key in addEmployeeForm){
        formElementArray.push({
            id: key,
            config: addEmployeeForm[key]
        })
    }

    //Making the button clickable if every field of the form is filled
    let formButtonClasses = null;

    if(formIsValid){
        formButtonClasses = classes.addEmployeeButton;
    }
    else{
        formButtonClasses = classes.DisabledButton;
    }

    let formInputClasses = null;
    let formTextAreaClasses = null;

    //Structure of form for adding employee
    const form = (
        <form id="form" className={classes.Form} onSubmit={event => employeeAddedHandler(event)}  >
            {formElementArray.map(formElement => {
                if(!formElement.config.valid && formElement.config.touched){
                    formInputClasses = classes.Invalid;
                    formTextAreaClasses = classes.textAreaInvalid;
                }
                else{
                    formInputClasses = classes.InputElement;
                    formTextAreaClasses = classes.textArea;
                }
                let input = null;
                let switchVariable = formElement.config.elementConfig.type;
                switch(switchVariable){
                    case 'text':
                        input = <input key={formElement.id} 
                                    className={formInputClasses} 
                                    onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                    {...formElement.config.elementConfig} 
                                />
                        return input;
                    case 'textarea':
                        input = <textarea key={formElement.id} 
                                    className={formTextAreaClasses} 
                                    onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                    {...formElement.config.elementConfig} >
                                </textarea>
                        return input;
                    case 'number':
                        input = <input key={formElement.id}
                                    className={formInputClasses}
                                    onChange={event => inputChangedHandler(event, formElement.id)}
                                    {...formElement.config.elementConfig} ></input>
                        return input;
                    case 'email':
                        input = <input key={formElement.id} 
                                    className={formInputClasses} 
                                    onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                    {...formElement.config.elementConfig} 
                                />
                        return input;
                    case 'select':
                        input = <select key={formElement.id}
                                    className={formInputClasses}
                                    onChange={(event => inputChangedHandler(event, formElement.id))} 
                                    >
                                        {formElement.config.elementConfig.options.map(option => (
                                            <option key={option.value} value={option.value} >
                                                {option.displayValue}
                                            </option>
                                        ))}
                                    </select>
                        return input;
                    case 'date':
                        input = <input key={formElement.id}
                                    className={formInputClasses}
                                    onChange={event => inputChangedHandler(event, formElement.id)}
                                    {...formElement.config.elementConfig} />
                        return input;
                    default: 
                        console.log("Should not go there!");
                }
                return input;
            })}
            <button disabled={!formIsValid} type="submit" className={formButtonClasses} >Add Employee</button>
        </form>
    )

    return(
        <div className={classes.FormDiv}>
            <h4 className={classes.AddEmployeeHeading}>Enter employee details</h4>
            {form}
        </div>
    )
}

//Subscribing to the redux store
const mapStateToProps = (state) => {
    return {
        show: state.show
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModal: () => dispatch({type: "Backdrop_Toggle"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeForm);