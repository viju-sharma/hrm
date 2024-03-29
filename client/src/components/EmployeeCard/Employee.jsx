import { Divider } from "semantic-ui-react";
import classes from "./Employee.module.css";
const Employee = (props) => {
  const employee = props.employee;
  return (
    <div className={classes.card} onClick={props.onClick}>
      <div className={classes.imageDiv}>
        <img className="coverImg" src={employee?.profileImg ? employee?.profileImg : "/images/matthew.png"} alt="profile" />
      </div>
      <div className={classes.nameDiv}>
        <p className={classes.name}>{employee.fullName}</p>
        <Divider className={classes.uidivider} fitted />
        <p className={classes.department}>{employee.department}</p>
      </div>
    </div>
  );
};
export default Employee;
