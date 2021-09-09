import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';

const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{backgroundColor:'#273c75'}}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title} style={{fontFamily:'monospace',color:'honeydew'}}>
          Travel Advisor <sub style={{fontFamily:'initial', fontSize:'12px',color:'#34e7e4'}}>Nauman</sub>
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title} style={{fontFamily:'-moz-initial', fontSize:'18px'}} >
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
