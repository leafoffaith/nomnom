/*
    @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500
    
    @description:
      This file styles the PlaceDetails React component using Material UI's makeStyles.

    @reference:
      https://gist.github.com/adrianhajdin/ede527249054b7abbdf4e3a9fac95b5e
      
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

  //Styles the cuisine chip in place details
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
}));