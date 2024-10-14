
//
// This JavaScript code defines two asynchronous functions, `getPlacesData` and `getWeatherData`, which use the Axios library to make GET requests to external APIs.
//
// * `getPlacesData` fetches a list of places (e.g., restaurants, attractions) within a specified boundary (defined by `sw` and `ne` coordinates) from the Travel Advisor API.
// * `getWeatherData` retrieves weather data for a specific location (defined by `lat` and `lng` coordinates) from the Open Weather Map API.
//
//     Both functions return the API response data if successful, and log any errors to the console if the request fails.
//
//     These functions are likely used in a travel advisor application to fetch relevant data for display on a map or in a list.
//
//     This code is from the file `src/api/travelAdvisorAPI.js`.


import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
