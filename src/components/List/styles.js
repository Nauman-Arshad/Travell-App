// This code defines a set of reusable CSS styles for a React application using Material-UI's makeStyles function. 
// It exports an object with six styles: formControl, selectEmpty, loading, container, marginBottom, and list, each with specific properties (e.g., margin, padding, height, display)
//  that can be applied to components throughout the app.

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', overflow: 'auto',
  },
}));
