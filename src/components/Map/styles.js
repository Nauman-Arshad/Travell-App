// This code defines a set of reusable CSS styles for a React application using 
// Material-UI's makeStyles function. It exports an object with four styles: paper, mapContainer,
// markerContainer, and pointer, each with specific properties (e.g., padding, display, height, width)
// that can be applied to components throughout the app.

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '85vh', width: '100%',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
}));
