import { Divider } from "semantic-ui-react";
import classes from "./Employee.module.css";
const Employee = (props) => {
  const employee = props.employee;
  return (
    <div className={classes.card} onClick={props.onClick}>
      <div>
        <img src="/images/matthew.png" alt="profile" />
      </div>
      <div className={classes.nameDiv}>
        <p className={classes.name}>
          {employee.firstname + " " + employee.lastname}
        </p>
        <Divider className={classes.uidivider} fitted />
        <p className={classes.department}>{employee.department}</p>
      </div>
    </div>
  );
};
export default Employee;
