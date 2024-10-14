

// This is a React functional component named `Map`. It renders a Google Map with markers and weather data. Here's a succinct breakdown:

// * The component receives several props: `coords`, `places`, `setCoords`, `setBounds`, `setChildClicked`, and `weatherData`.
// * It uses the `useMediaQuery` hook to determine if the screen width is at least 600px.
// * It renders a `GoogleMapReact` component with a custom map style (`mapStyles`) and several markers:
// 	+ Markers for `places` are displayed with a `LocationOnOutlinedIcon` on small screens and a `Paper` component with the place's name, photo, and rating on larger screens.
// 	+ Markers for `weatherData` are displayed with a weather icon.
// * The component updates the `coords` and `bounds` state when the map is changed, and sets the `childClicked` state when a marker is clicked.

// Overall, this component is likely used in a travel advisor application to display a map with relevant locations and weather information.


import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer} alt="img"
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt='img' />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
