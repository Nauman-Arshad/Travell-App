// This is a React functional component named Header. It renders a static app bar with a title, a search bar, and a search icon.
//  The search bar is an autocomplete input field that uses the Google Maps API to suggest places as the user types.
//  The component expects two props: onPlaceChanged and onLoad,
// which are likely callback functions that handle the user's search input and the loading of search results, respectively.
// The component's styles are imported from a separate file styles.js.

import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles.js';

const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{backgroundColor: '#e84393'}}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title} style={{fontFamily:'monospace',color:'honeydew'}}>
          Travel Advisor
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
