import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const styling = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 20px', // Add some padding for the button
    transition: 'background-color 0.3s, color 0.3s', // Add a transition for smooth color and background color changes
    marginLeft: '40px',
    '&:hover': {
      backgroundColor: 'aqua', // Change the background color on hover
      color: 'black', // Change the text color on hover
    },
  },
  logout: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 20px',
    transition: 'background-color 0.3s, color 0.3s',
    marginLeft: '600px',
    '&:hover': {
      backgroundColor: 'aqua',
      color: 'black',
    },
  },
});

const UserNavbar = () => {
  const styles = styling();

  return (
    <AppBar position='static' color='secondary' style={{ backgroundColor: 'black' }}>
      <Toolbar variant="dense">
        <NavLink to="viewproducts" className={styles.link}>
          All Products
        </NavLink>
        <NavLink to="cart" className={styles.link}>
          My Cart
        </NavLink>
        <NavLink to="orders" className={styles.link}>
          My Orders
        </NavLink>
        <NavLink to="/ulogout" className={styles.logout}>
          Logout
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default UserNavbar;
