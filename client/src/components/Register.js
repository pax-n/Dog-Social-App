import React from 'react';
import { useContext } from 'react';
import { userContext } from './providers/UserProvider';
import { toggleContext } from './providers/ToggleProvider';
import axios from "axios";
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
import Button from '@mui/material/Button';



function Register() {
  const { login } = useContext(userContext);
  const { toggle } = useContext(toggleContext);
  
  const [location, setLocation] = React.useState('');
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    breed:'',
    gender:'',
    date: null,
    email:'',
    dog_name:'',
    owner_first_name:'',
    owner_last_name:'',
    profile_pic_url:'',
    bio_description:'',
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

  const onSubmit = function(event) {
    event.preventDefault();
    const email = values.email;
    const password = values.password;
    const dog_name = values.dog_name;
    const breed = values.breed;
    const gender = values.gender;
    const date = values.date;
    const owner_first_name = values.owner_first_name;
    const owner_last_name = values.owner_last_name;
    const profile_pic_url = values.profile_pic_url;
    const bio_description = values.bio_description;
    const parsedDate = ("0" + date.getUTCDate()).slice(-2)
    const parsedMonth = ("0" + (date.getUTCMonth() + 1)).slice(-2)
    const birth_date = date.getFullYear()+"-"+parsedMonth+"-"+parsedDate
    const data = { email, password, dog_name, breed, gender, birth_date, owner_first_name, owner_last_name, profile_pic_url, bio_description, location};
    console.log(data)
    axios.post("/register", data).then((responses) => {
      console.log("Post sent to database.");
      console.log("Response: ", responses);
      axios.get("/auth").then((responses) => {
        console.log("Response: ", responses.data);
        if (responses.data) {
          login(responses.data)
        };
      });
    });
  };

  const dogBreeds = ['Shiba Inu','Dachshund','Labrador Retriever','Shih-tzu','Husky','Poodle','Greyhound'];
  const breedMenu = dogBreeds.map((element) => (
    <MenuItem value={element}>{element}</MenuItem>
  ));
  return (

      <Box
      onSubmit={onSubmit}
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      style={{
        position: 'absolute', 
        left: '50%', 
        transform: 'translate(-50%)'
      }}
    >
      <h1>Register</h1>
      <TextField
        id="outlined-uncontrolled"
        label="Email"
        sx={{ m: 0.5, width: '30ch' }}
        value={values.email}
        onChange={handleChange('email')}
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
        value={values.dog_name}
        onChange={handleChange('dog_name')}
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
          {breedMenu}
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
          sx={{ m: 0.5, width: '29.8ch' }}
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
        value={values.owner_first_name}
        onChange={handleChange('owner_first_name')}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Owner's Last Name"
        sx={{ m: 0.5, width: '30ch' }}
        value={values.owner_last_name}
        onChange={handleChange('owner_last_name')}
      />
      <br />

      <TextField
        id="outlined-uncontrolled"
        label="Profile Image URL"
        sx={{ m: 0.5, width: '62ch' }}
        value={values.profile_pic_url}
        onChange={handleChange('profile_pic_url')}
      />
      <SearchLocation onChange={setLocation}
      />

      <br />
      
      <TextField
        sx={{ m: 0.5, width: '62ch' }}
        id="outlined-multiline-static"
        label="Bio"
        multiline
        rows={4}
        value={values.bio_description}
        onChange={handleChange('bio_description')}
      />
      <br />

    <Button variant="contained" type="Submit" sx={{ m: 0.5 }}>Submit</Button>
    <Button onClick={toggle} ><strong>Already registered?</strong></Button>
    </Box>
  );

}

export default Register;