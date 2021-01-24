export const backdropToggle = () => {
    return{
        type: 'Backdrop_Toggle'
    }
}

export const employeeModalToggle = () => {
    return {
        type: 'Employee_Modal_Toggle',
    }
}

export const getCardID = (id) => {
    return {
        type: 'Get_Card_ID',
        id: id
    }
}