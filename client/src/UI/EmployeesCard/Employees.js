import React from 'react'
import classes from './Employees.module.css';
import {connect} from 'react-redux';
import * as actionCreaters from '../../Store/ActionCreators';

const employeeCard = (props) => {

    const onClickedCard = (id) => {
        props.onCardClick();
        props.getCardID(id);
    } 

    return (
            <div className={classes.EmployeeCard} id={props.id} onClick={(id) => onClickedCard(props.id)}>
                <h3>{props.name}</h3>
                <h3>{props.email}</h3>
                <h3>{props.employeeID}</h3> 
            </div>
        
    );
}

const mapStateToProps = state => {
    return {
        showEmployeeModal: state.showEmployeeModal
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onCardClick: ()=>dispatch(actionCreaters.employeeModalToggle()),
        getCardID: (id) => dispatch(actionCreaters.getCardID(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(employeeCard);