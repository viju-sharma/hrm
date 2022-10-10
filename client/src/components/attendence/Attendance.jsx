import React, { useEffect } from "react";
import Navigation from "../navigation/Navigation";
import AbsentEmployeeCard from "./AbsentEmployeeCard";
import PresentEmployeeCard from "./PresentEmployeeCard";

import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Attendance = (props) => {
  const searchValue = useSelector((state) => state.searchValue.search);

  const absentIDs = props.absentIDs;
  return (
    <React.Fragment>
      <Navigation
        icon="users"
        title="Attendance"
        active={"attendance"}
        search
      />
      <Container>
        <div className="ui horizontal divider">Absent Employees Employees</div>

        <AbsentEmployeeCard searchValue={searchValue} />
        {absentIDs.length < 1 && <h1>All Present</h1>}
      </Container>
      <Container>
        <div className="ui horizontal divider">All Employees</div>

        <PresentEmployeeCard absentIDs={absentIDs} searchValue={searchValue} />
        {!(<PresentEmployeeCard />) && <h1>No Employees</h1>}
      </Container>
    </React.Fragment>
  );
};

export default Attendance;
