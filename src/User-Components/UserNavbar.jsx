import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const styling = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 20px',
    transition: 'background-color 0.3s, color 0.3s',
    marginLeft: '40px',
    '&:hover': {
      backgroundColor: 'aqua',
      color: 'black',
    },
  },
  logout: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 20px',
    transition: 'background-color 0.3s, color 0.3s',
    marginLeft: 'auto', // This will push the logout button to the rightmost position
    '&:hover': {
      backgroundColor: 'aqua',
      color: 'black',
    },
  },
});

const UserNavbar = ({ isAdmin }) => { // Assuming isAdmin is a prop indicating if the user is an admin
  const styles = styling();

  return (
    <AppBar position='static' color='secondary' style={{ backgroundColor: 'black' }}>
      <Toolbar variant="dense">
        <NavLink to="viewproducts" className={styles.link}>
          All Products
        </NavLink>
        {!isAdmin && ( // Render these links only if the user is not an admin
          <>
            <NavLink to="cart" className={styles.link}>
              My Cart
            </NavLink>
            <NavLink to="orders" className={styles.link}>
              My Orders
            </NavLink>
          </>
        )}
        <NavLink to="/ulogout" className={styles.logout}>
          Logout
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default UserNavbar;
