import {updateObject} from '../Utility';
import axios from 'axios';

let employeesArrayMain = [];

axios.get('http://localhost:4000/api/employeeDetails')
.then(response => {
    for(let key in response.data){
        employeesArrayMain.push(response.data[key]);
    }
})
.catch(err=>err.message);

const initialState = {
    showEmployeeModal: false,
    show: false,
    employeesArrayMain: employeesArrayMain,
    clickedCardID: null
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'Backdrop_Toggle':
            return updateObject(state, {show: !state.show});
        case 'Employee_Modal_Toggle':
            return updateObject(state, {showEmployeeModal: !state.showEmployeeModal});
        case 'Get_Card_ID':
            return updateObject(state, {clickedCardID: action.id});
        default: 
        break;
    }
    return state;
}

export default reducer;