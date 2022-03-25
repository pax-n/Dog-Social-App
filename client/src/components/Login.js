import React from "react";
import { useState, useContext } from "react";
import { userContext } from "./providers/UserProvider";
import { toggleContext } from "./providers/ToggleProvider";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

function Login() {
  const { login } = useContext(userContext);
  const { toggle } = useContext(toggleContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = function (event) {
    event.preventDefault();
    const email = values.email;
    const password = values.password;
    const data = [ email, password ];
    console.log(data);
    axios.post("/login", data).then((responses) => {
      console.log("Post sent to database.");
      console.log("Response: ", responses);
      values.email && login(values.email, values.password);
    });
  };

  return (
    <Box
      onSubmit={onSubmit}
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>
        <h1>Login</h1>
        <FormControl sx={{ my: 0.25, width: "30ch" }} variant="outlined">
          <FormGroup sx={{ my: 0.25, width: "30ch" }} variant="outlined">
            <TextField
              id="outlined-uncontrolled"
              label="Email"
              sx={{ width: "30ch" }}
              value={values.email}
              onChange={handleChange("email")}
            />
          </FormGroup>
          <FormControl sx={{ my: 0.25, width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button variant="contained" type="Submit" sx={{ my: 0.5 }}>
            Submit
          </Button>
        </FormControl>
        <Button onClick={toggle}>
          <strong>Not registered?</strong>
        </Button>
      </div>
    </Box>
  );
}

export default Login;
