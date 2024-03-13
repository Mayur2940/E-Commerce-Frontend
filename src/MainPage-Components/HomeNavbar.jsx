import '../App.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
//import { createTheme } from '@mui/material/styles';


const styling = makeStyles({
    home: {
        color: '#280659',
        textDecoration: 'none'
    
    },
 
    rightButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
    },
});

// const myTheme = createTheme({
//     components: {
//       MuiToolbar: {
//         styleOverrides: {
//           regular: {
//             height: "12px",
//             width: "20px",
//             height: "32px",
//             minHeight: "32px",
//             "@media (min-width: 600px)": {
//               minHeight: "48px",
//             },
//             backgroundColor: "yellow",
//             color: "#000000",
//           },
//         },
//       },
//     },
//   });
const HomeNavbar = () => {
    const styles = styling();
    let id = sessionStorage.getItem("id");

    return (
        <AppBar position="static" style={{ backgroundColor: '#83c2b1' }}>
            <Toolbar variant="dense">
            <Typography variant="h4" color="yellow" component="div">
                <NavLink to="/" className={styles.home}>
                    <span style={{ fontSize: '1.1em', color: 'linear-gradient(blue, orange)', fontWeight: 'bold'}}>Old Furniture</span>
                </NavLink>
            </Typography>


                <div className={styles.rightButtonsContainer}>
                    <NavLink to="/user" className="righttButton">
                        Customer Login
                    </NavLink>
                    <NavLink to="/admin" className="lefttButton">
                        Admin Login
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;
