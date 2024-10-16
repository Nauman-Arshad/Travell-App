
// This is a React functional component named `App`. It appears to be the main entry point of a travel advisor application, displaying a map and a list of places (e.g., restaurants, attractions) with filtering options.

// Here's a succinct breakdown:

// * The component uses several state variables to store data, such as `type` (e.g., restaurants, attractions), `rating`, `coords` (current location), `bounds` (map boundaries), `weatherData`, `filteredPlaces`, and `places`.
// * Three `useEffect` hooks are used to:
// 	1. Get the current location using `navigator.geolocation`.
// 	2. Filter places based on the `rating` state.
// 	3. Fetch weather data and places data from APIs when the `bounds` state changes.
// * The component renders a `Header` component, a `List` component, and a `Map` component.
// * The `List` component displays a list of places with filtering options, and the `Map` component displays a map with markers for places and weather data.
// * The component also defines two callback functions, `onLoad` and `onPlaceChanged`, which are passed to the `Header` component.

// Overall, this component manages the application's state and renders the main UI components, which are responsible for displaying the map, list of places, and filtering options.



import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [places, rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
  
      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data));
  
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          if (data && Array.isArray(data)) {
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          } else {
            console.error('Invalid data format:', data);
            setPlaces([]);
          }
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
          setIsLoading(false);
        });
    }
  }, [bounds, type, coords.lat, coords.lng]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
