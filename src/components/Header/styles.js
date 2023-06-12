/*
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>

    @description:
      This file styles the Header and Menu React component using Material UI's makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '90px',
  },

  //Hamburger menu not displayed on larger screens but become visable on smaller screens
  navbarMenuContainer: {
    display: 'none',
    '@media (max-width:860px)': {
      display: 'flex',
    },
    //styling for icons in hamburger menu
    '& svg' : {
    fontSize: '2rem',
    cursor: 'pointer',
    color: 'black',
    }
  },

  //Main header links aren't displayed on smaller screens
  navbarLinksContainer: {
    paddingLeft: '3rem',
    '@media (max-width:860px)': {
      display: 'none',
    },
    '@media (max-width:1100px)': {
      'a': {
        marginRight: '1rem',
        fontSize: '1rem',
      },
    },
    '& a': {
      marginRight: '3rem',
      textDecoration: 'none',
      color: 'black',
      fontSize: '1.25rem',
      fontWeight: 600,
      '&:hover': {
        color: 'orange',
      },
    },
  },
  
  navAccountIconContainer: {
    color: 'black',
  },

  navLogoContainer: {
    maxWidth: '350px',
    '@media (max-width:860px)': {
      maxWidth: '50vw',
    },
  },
  
  menuItemLinks: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: 'orange',
    },
  },
}));