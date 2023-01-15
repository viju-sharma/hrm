import React, { useState } from "react";
import AbsentEmployeeCard from "./AbsentEmployeeCard";
import PresentEmployeeCard from "./PresentEmployeeCard";

import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";

// date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Navigation from "../../components/navigation/Navigation";

const Attendance = (props) => {
  const searchValue = useSelector((state) => state.searchValue.search);

  const [date, setDate] = useState(new Date());

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
        <div>
          <div style={{ textAlign: "right", padding: "1rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="ui horizontal divider">Absent Employees Employees</div>

        <AbsentEmployeeCard searchValue={searchValue} date={date} />
        {absentIDs.length < 1 && <h1>All Present</h1>}

        <div className="ui horizontal divider">All Employees</div>

        <PresentEmployeeCard
          absentIDs={absentIDs}
          searchValue={searchValue}
          date={date}
        />
        {!(<PresentEmployeeCard />) && <h1>No Employees</h1>}
      </Container>
    </React.Fragment>
  );
};

export default Attendance;
