import React, { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Box,
  FormGroup,
  Button,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { axiosAddUser } from '../Service-Components/ServiceUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from '../MainPage-Components/HomeNavbar';

toast.configure();

const initialvalue = {
  username: '',
  password: '',
  email: '',
  number: '',
  address: '',
};

const UserRegister = () => {
  const [user, setUser] = useState(initialvalue);
  const { username, password, email, number, address } = user;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const onValueInput = (e) => {
    const { name, value } = e.target;
    // Prevent numbers in the username field
    if (name === 'username' && /\d/.test(value)) {
      setErrors({ ...errors, [name]: 'Please enter characters only.' });
      return;
    }
    setUser({ ...user, [name]: value });
  };

  const notifysuccess = (msg) => {
    toast.success(msg, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(user.number)) {
      newErrors.number = 'Please enter a valid 10-digit mobile number.';
      valid = false;
    }
    if (user.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      valid = false;
    }
    if (user.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters long.';
      valid = false;
    }
    if (user.address.length < 3) {
      newErrors.address = 'Address must be at least 3 characters long.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const registerUser = async () => {
    if (validateForm()) {
      await axiosAddUser(user);
      notifysuccess('User Registered Successfully');
      history.push('/user');
    }
  };

  return (
    <div>
      <HomeNavbar />
      <div className='register-form'>
        <Container maxWidth='sm'>
          <Box my={1} border={1} borderRadius={10} p={2} style={{ width: "320px", height: "330px" }}>
            <Typography variant='h5' align='center'>
              Customer Registration Form
            </Typography>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel htmlFor='username'>Customer Name</InputLabel>
                    <Input
                      id='username'
                      onChange={(e) => onValueInput(e)}
                      name='username'
                      value={username}
                    />
                    {errors.username && (
                      <span style={{ color: 'red' }}>{errors.username}</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel htmlFor='email'>Customer Email</InputLabel>
                    <Input
                      id='email'
                      onChange={(e) => onValueInput(e)}
                      name='email'
                      value={email}
                    />
                    {errors.email && (
                      <span style={{ color: 'red' }}>{errors.email}</span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                      id='password'
                      onChange={(e) => onValueInput(e)}
                      name='password'
                      value={password}
                      type='password'
                    />
                    {errors.password && (
                      <span style={{ color: 'red' }}>{errors.password}</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel htmlFor='number'>Mobile Number</InputLabel>
                    <Input
                      id='number'
                      onChange={(e) => onValueInput(e)}
                      name='number'
                      value={number}
                    />
                    {errors.number && (
                      <span style={{ color: 'red' }}>{errors.number}</span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl fullWidth>
                <InputLabel htmlFor='address'>Address</InputLabel>
                <Input
                  id='address'
                  onChange={(e) => onValueInput(e)}
                  name='address'
                  value={address}
                />
                {errors.address && (
                  <span style={{ color: 'red' }}>{errors.address}</span>
                )}
              </FormControl>
              <Box my={3} display='flex' justifyContent='space-between'>
                <Button
                  variant='contained'
                  onClick={() => registerUser()}
                  style={{ backgroundColor: 'blue', color: 'white' }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => history.push('/user')}
                  variant='contained'
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Cancel
                </Button>
              </Box>
            </FormGroup>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default UserRegister;
