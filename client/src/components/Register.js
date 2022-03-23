import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import SearchLocation from "./SearchLocation";


function Register() {

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    breed:'',
    gender:'',
    date: null,
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

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <h1>Register</h1>
        
      <TextField
        id="outlined-uncontrolled"
        label="Email"
        sx={{ m: 0.5, width: '30ch' }}
      />
      
      <FormControl sx={{ m: 0.5, width: '29.8ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
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
      <br />
      
      <TextField
        id="outlined-uncontrolled"
        label="Dog Name"
        sx={{ m: 0.5, width: '30ch' }}
        />
      
      <FormControl sx={{ m: 0.5, width: '30ch' }}>
      <InputLabel id="demo-simple-select-label">Dog Breed</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Dog Breed"
        value={values.breed}
        onChange={handleChange('breed')}
      >
          <MenuItem value={"Dachshund"}>Dachshund</MenuItem>
          <MenuItem value={"Shiba Inu"}>Shiba Inu</MenuItem>
          <MenuItem value={"Shih-tzu"}>Shih-tzu</MenuItem>
      </Select>
      </FormControl>
      <br />

      <FormControl sx={{ m: 0.5, width: '29.8ch' }}>
        <InputLabel id="demo-simple-select-label">Dog Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Dog Gender"
          value={values.gender}
          onChange={handleChange('gender')}>
          <MenuItem value={"m"}>Male</MenuItem>
          <MenuItem value={"f"}>Female</MenuItem>
          <MenuItem value={"u"}>Unsure/Other</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Dog's Date of Birth"
          value={values.date}
          onChange={(newValue) => {
            setValues({ ...values, date: newValue });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <br />

      <TextField
        id="outlined-uncontrolled"
        label="Owner's First Name"
        sx={{ m: 0.5, width: '30ch' }}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Owner's Last Name"
        sx={{ m: 0.5, width: '30ch' }}
      />
      <br />

      <TextField
        id="outlined-uncontrolled"
        label="Profile Image URL"
        sx={{ m: 0.5, width: '62ch' }}
      />
      <SearchLocation />

      <br />
      
      <TextField
        sx={{ m: 0.5, width: '62ch' }}
        id="outlined-multiline-static"
        label="Bio"
        multiline
        rows={4}
      />

    </Box>
  );

}

export default Register;