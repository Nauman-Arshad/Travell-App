

// This code defines a set of reusable CSS styles for a React application using Material-UI's `makeStyles` function.
// It exports an object with three styles: `chip`, `subtitle`, and `spacing`, each with specific properties (e.g., margin, display, alignment)
//  that can be applied to components throughout the app.


import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
}));
