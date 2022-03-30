import React from "react";
import { useContext } from "react";
import { userContext } from "../providers/UserProvider";
import { toggleContext } from "../providers/ToggleProvider";
import "./CreateEvent.css";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import SearchLocation from "../SearchLocation";
import axios from "axios";

function CreateEvent({ showEvent }) {
  const { toggle, toggleReset } = useContext(toggleContext);
  const { userDog } = useContext(userContext);
  const [defaultDate, setDefaultDate] = React.useState(
    new Date("2022-01-01T00:00:00")
  );
  const [location, setLocation] = React.useState("");
  const [values, setValues] = React.useState({
    created_by_dog_id: "",
    description: "",
    start_time: null,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return (
      [
        date.getUTCFullYear(),
        padTo2Digits(date.getUTCMonth() + 1),
        padTo2Digits(date.getUTCDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getUTCHours()),
        padTo2Digits(date.getUTCMinutes()),
        padTo2Digits(date.getUTCSeconds()),
      ].join(":")
    );
  }

  const onSubmit = function (event) {
    const created_by_dog_id = userDog;
    const description = values.description;
    const date = values.date;
    const start_time = formatDate(date);
    const end_date = values.end_date;
    const end_time = formatDate(end_date);
    const data = {
      description,
      created_by_dog_id,
      location,
      start_time,
      end_time,
    };
    axios.post(`/api/events`, data).then((response) => {
      console.log("Event posted: ", response);
    });
  };

  return (
    <div>
      {showEvent === "CreateEvent" && (
        <div className="createEvent">
          <div className="createEvent__header">
            <h2>Create an Event</h2>
          </div>
          {/* <div className="createEvent__title">
            <TextField fullWidth label="Title" id="fullWidth" />
          </div> */}
          <div className="createEvent__description">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              value={values.description}
              onChange={handleChange("description")}
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
                  value={values.date}
                  onChange={(newValue) => {
                    setValues({ ...values, date: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End Date"
                  value={values.end_date}
                  onChange={(newValue) => {
                    setValues({ ...values, end_date: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="button">
              <Button
                className="createEvent__button"
                variant="contained"
                color="success"
                onClick={onSubmit}
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
