/*
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>
    
    @description:
      This file styles the UserAccount React component using Material UI's makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    backgroundColor: 'orange',
    width: '50px',
    height: '50px',
  },

  userName: {
    margin: '30px 0 10px 0'
  },

  favouritesAndReviews: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15rem',
    height: '18rem',
    '&:hover': {backgroundColor: '#fe9e0d', cursor: 'pointer'}, 
  },

  cardMedia: {
    width: '100%',
    maxWidth: '15rem',
    height: '11rem',
    margin: 0,
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  //displayed in a row on smaller screens and in a column on larger screens
  favoritesContainer: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },

  reviewCard: {
    width: '80vw',
    marginBottom: '30px',
  },

  reviewCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },

  logOutButton: {
    backgroundColor: 'grey',
    fontSize: '12pt',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '1rem',
    color: 'white',
    '& svg': {marginLeft: '0.75rem'},
    '&:hover': {backgroundColor: 'black'},
  }

}));