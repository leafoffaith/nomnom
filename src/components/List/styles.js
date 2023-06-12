/*
    @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500
    
    @description:
      This file styles the List React component using Material UI's makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  //Style on the loading state UI
  loading: {
    height: '600px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  //Style applied to the main container of the component
  //Uses media queries to adjust the maximum width of the container responsively
  container: {
    padding: '25px',
    alignContent: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '600px',
    },
  },

  //Sets a responsive list height to the list elements and enables automatic overflow
  list: {
    height: '75vh', 
    overflow: 'auto', 
  },
}));