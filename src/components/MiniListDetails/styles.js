/*
    @author: Kevin Gao <c2036306@newcastle.ac.uk>
    
    @description:
      This file styles the MiniListDetails React component using Material UI's makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  
  //styling of the cuisine chip
  chip: {
    margin: '5px 5px 5px 0',
  },

  subtitle: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: '10px',
  },

  spacing: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },

  image: {
    padding: '50px',
  },

  imageContainer: {
    padding: '20px',
  }
}));