import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from '../MainPage-Components/HomeNavbar';
import '../App.css'; // Import your CSS file

toast.configure();

const initialvalue = {
    email: "",
    password: ""
};

const UserLogin = () => {
    const [userdetails, setUserdetails] = useState(initialvalue);
    const history = useHistory();

    const onValueChange = (e) => {
        setUserdetails({ ...userdetails, [e.target.name]: e.target.value });
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
            theme: 'colored'
        });
    };

    const notifyerror = (msg) => {
        toast.error(msg, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored'
        });
    };

    const userCredentialsValidation = async (data) => {
        let retriveCredentials = await fetch("http://localhost:8080/user/allCustomers");
        let validation = await retriveCredentials.json();
        let flag = false;

        for (let i = 0; i < validation.length; i++) {
            if (validation[i].email === data.email && validation[i].password === data.password) {
                flag = true;
                sessionStorage.setItem("id", validation[i].id);
            }
        }
        if (flag === true) {
            notifysuccess("User Login Successfull !!!!");
            history.push("/userpage");
        } else {
            notifyerror("User Credentials are Incorrect !!!!!!")
        }
    };

    return (
        <div>
            <HomeNavbar />
            <div className="login-form">
                <Container maxWidth="sm" className="form-container">
                    <Typography variant="h5" align="center" className="form-title">
                        Customer Login
                    </Typography>
                    <FormControl className="form-group">
                        <InputLabel>User Email</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="email" value={userdetails.email} />
                    </FormControl>
                    <FormControl className="form-group">
                        <InputLabel>User Password</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name="password" value={userdetails.password} type="password" />
                    </FormControl>
                    <Button variant="contained" onClick={() => userCredentialsValidation(userdetails)} className="submit-btn">
                        Login
                    </Button>
                    <p className="register-text">Register if you are a new User!</p>
                    <Button variant="contained" onClick={() => history.push('/userregister')} className="submit-btn">
                        Register
                    </Button>
                </Container>
            </div>
        </div>
    );
};

export default UserLogin;
