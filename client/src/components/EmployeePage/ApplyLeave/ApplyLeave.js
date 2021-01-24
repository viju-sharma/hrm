import React,{useState} from 'react';
import classes from './ApplyLeave.module.css';
import axios from 'axios';

const leaveFormat = (elType, type, placeHolder, value, validation) => {
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

const ApplyLeave = () => {

    const [applyLeave, setApplyLeave] = useState({
        name: leaveFormat("input", "text", "Name", "", {required: true}),
        email: leaveFormat("input", "email", "Email", "", {required: true}),
        from_date: leaveFormat("input", "date", "From", "", {required: true}),
        to_date: leaveFormat("input", "date", "To", "", {required: true}),
        reason: leaveFormat("input", "textarea", "Reason", "", {required: true}),
    })

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

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedEmployeeData = {
            ...applyLeave
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

        setApplyLeave(updatedEmployeeData);
        
    }

    const leaveAppliedHandler = (event) => {
        event.preventDefault();
        const leaveData = {};
        for(let leaveDataIdentifier in applyLeave){
            leaveData[leaveDataIdentifier] = applyLeave[leaveDataIdentifier].value;
        }
        console.log("leave data",leaveData)

        axios.post('http://localhost:4000/api/applyForLeave', leaveData )
        .then((response) => {
            window.location.reload();
        })
        .catch(error => error.message);
    }

    const formElementArray = [];
    for(let key in applyLeave){
        formElementArray.push({
            id: key,
            config: applyLeave[key]
        })
    }

    const form = (
        <form id="form" className={classes.Form} onSubmit={event => leaveAppliedHandler(event)}  >
            {formElementArray.map(formElement => {
                // if(!formElement.config.valid && formElement.config.touched){
                //     formInputClasses = classes.Invalid;
                //     formTextAreaClasses = classes.textAreaInvalid;
                // }
                // else{
                //     formInputClasses = classes.InputElement;
                //     formTextAreaClasses = classes.textArea;
                // }
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
                                    className={classes.InputElementArea}
                                    onChange={(event) => inputChangedHandler(event, formElement.id)} 
                                    {...formElement.config.elementConfig} 
                                    resize="none" >
                                </textarea>
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
            <button type="submit" className={classes.ApplyLeaveButton} >Apply for Leave</button>
        </form>
    )

    return (
        <div className={classes.formContainerDiv}>
            <h1>Apply For Leave</h1>
            {form}
        </div>
    )
}

export default ApplyLeave;