import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Login</Button>
        <Button color="inherit" component={Link} to="/messaging">Messaging</Button>
        <Button color="inherit" component={Link} to="/progress">Progress</Button>
        <Button color="inherit" component={Link} to="/meeting">Meeting</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
