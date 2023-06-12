/*
    @author: Kevin Gao <c2036306@newcastle.ac.uk>
    
    @description:
      This file styles the MiniList React component using Material UI's makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  //calculates a responsive height for the loading element
  loading: {
    height: 'calc(100vh - 100px)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '450px',
    },
  },

  container: {
    padding: theme.spacing(2),
    height: '350px',
    width: '750px',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      width: '100%',
      padding: theme.spacing(1),
    },
  },

  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  
}));

