const Employee = (props) => {
  const employee = props.employee;
  const createdAt =
    new Date(employee.createdAt).toLocaleString("default", {
      month: "long",
    }) +
    "-" +
    new Date(employee.createdAt).getFullYear();
  return (
    <div className="card" onClick={props.onClick}>
      <div className="image">
        <img alt="" src="/images/matthew.png" />
      </div>
      <div className="content">
        <div className="header">
          {employee.firstname + " " + employee.lastname}
        </div>
        <div className="meta">
          <span>{employee.department}</span>
        </div>
        <div className="description">
          <a href={`mailto:${employee.email}`}>{employee.email}</a>
          <span> | </span>
          <a href={`tel:${employee.mobile}`}>{employee.mobile}</a>
        </div>
      </div>
      <div className="extra content">
        <span className="right floated">Joined in {createdAt}</span>
        <span>
          <i className="user icon"></i>
          151 Friends
        </span>
      </div>
    </div>
  );
};
export default Employee;
