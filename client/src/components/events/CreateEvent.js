import React from "react";
import "./CreateEvent.css";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import SearchLocation from "../SearchLocation";

function CreateEvent({ showEvent }) {
  const [value, setValue] = React.useState(new Date("2022-01-01T00:00:00"));
  const [location, setLocation] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {showEvent === "CreateEvent" && (
        <div className="createEvent">
          <div className="createEvent__header">
            <h2>Create an Event</h2>
          </div>
          <div className="createEvent__title">
            <TextField fullWidth label="Title" id="fullWidth" />
          </div>
          <div className="createEvent__description">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="createEvent__location">
            <SearchLocation onChange={setLocation} />
          </div>
          <div className="createEvent__bottom">
            <div className="createEvent__date">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Date"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End Date"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="button">
              <Button
                className="createEvent__button"
                variant="contained"
                color="success"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateEvent;
