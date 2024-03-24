import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core';
import logoImage from '../images/logo1.png'; // Import the logo image

const styling = makeStyles({
    home: {
        color: '#280659',
        textDecoration: 'none'
    },
    rightButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    customerButton: {
        color: 'white',
        background: 'black', // Change the button color here
        borderRadius: '15px',
        padding: '10px 15px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        marginRight: '10px',
        marginLeft: '10px', // Add some margin between buttons
        transition: 'background-color 0.3s',
    },
    adminButton: {
        color: 'white',
        background: 'black', // Change the button color here
        borderRadius: '15px',
        padding: '10px 15px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    logoContainer: {
        width: '80px', // Increase width to accommodate space and border
        height: '70px', // Increase height to accommodate space and border
        overflow: 'hidden', // Hide overflow content
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #280659', // Add border with your desired color
        borderRadius: '5px', // Add border radius for rounded corners
        padding: '5px', // Add padding to create space between the image and border
    },
    logoImage: {
        
            width: '100%', // Ensure the image takes up the full width of the container
            height: '100%', // Automatically adjust the height to maintain aspect ratio
            objectFit: 'cover', // Ensure the image covers the container


    },
});

const HomeNavbar = () => {
    const styles = styling();

    return (
        <AppBar position="static" style={{ backgroundColor: '#E6F2FF' }}>
            <Toolbar variant="dense">
            <Typography variant="h4" color="yellow" component="div">
    <NavLink to="/" className={styles.home}>
        <span className={styles.logoContainer}>
            {/* Display the logo image */}
            <img src={logoImage} alt="Logo" className={styles.logoImage} />
        </span>
    </NavLink>
</Typography>

                <div className={styles.rightButtonsContainer}>
                    <NavLink to="/user" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button
                            className={styles.customerButton}
                            component="span"
                            onMouseOver={(e) => e.target.style.background = 'lightgrey'}
                            onMouseOut={(e) => e.target.style.background = 'black'}
                        >
                            Customer Login
                        </Button>
                    </NavLink>
                    <NavLink to="/admin" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button
                            className={styles.adminButton}
                            component="span"
                            onMouseOver={(e) => e.target.style.background = 'lightgrey'}
                            onMouseOut={(e) => e.target.style.background = 'black'}
                        >
                            Admin Login
                        </Button>
                    </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;
