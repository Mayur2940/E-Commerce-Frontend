import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const styling = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 20px',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    marginLeft: '20px',
    '&:hover': {
      backgroundColor: 'aqua',
      color: 'black',
      borderColor: 'white',
    },
  },
  logout: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 10px',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'aqua',
      color: 'black',
      borderColor: 'white',
    },
  },
});

const AdminNavbar = () => {
  const styles = styling();

  return (
    <AppBar position='relative' color='secondary' style={{ backgroundColor: 'black' }}>
      <Toolbar variant="dense">
        <NavLink to="allusers" className={styles.link}>
          All Users
        </NavLink>
        <NavLink to="productsall" className={styles.link}>
          All Products
        </NavLink>
        <NavLink to="allcategories" className={styles.link}>
          All Categories
        </NavLink>
        <NavLink to="allorders" className={styles.link}>
          All Orders
        </NavLink>

        <NavLink to="/alogout" className={styles.logout}>
          Logout
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
