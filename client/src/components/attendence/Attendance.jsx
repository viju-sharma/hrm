import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import AbsentEmployeeCard from "./AbsentEmployeeCard";
import PresentEmployeeCard from "./PresentEmployeeCard";

import { Container } from "semantic-ui-react";

const Attendance = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const pull_search_val = (data) => {
    setSearchValue(data);
  };

  const absentIDs = props.absentIDs;
  // trigger when anything get changed in presentEmployee section

  return (
    <React.Fragment>
      <Navigation
        active={"attendance"}
        searchValue={searchValue}
        changedValue={pull_search_val}
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
