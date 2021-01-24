import React from 'react';
import {connect} from 'react-redux';
import classes from './AddEmployee.module.css';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';
import Backdrop from '../Backdrop/Backdrop';
// import * as actionCreaters from '../../Store/ActionCreators';

const AddEmployeeModal = (props) => {

    return (
        <React.Fragment>
            <Backdrop  show={props.show} clicked={props.toggleModal} />
            <div
                className={classes.Modal}
                style={{transform: props.show ? 'translateY(-14vh)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'}
                }>
                <AddEmployeeForm propsHistory={props.history} />
            </div>
        </React.Fragment>
    );
}

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



export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeModal);