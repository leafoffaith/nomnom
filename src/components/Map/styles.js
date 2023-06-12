/* 
    @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500 

    @description:
      Styles the map component using Material-UI's makeStyles

    @reference:
      https://material-ui.com/styles/basics/
      https://gist.github.com/adrianhajdin/ede527249054b7abbdf4e3a9fac95b5e
      
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    width: '150px', 
    backgroundColor:'white',
  },

  paperContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  
  mapContainer: {
    height: '80%', 
    width: '80%', 
    position: 'relative',
  },

  //displays the miniList centered underneath the map
  miniListContainer: {
    position: 'absolute',
    '@media (min-width: 960px)': {
      left: '50%',
      transform: 'translateX(-50%)',
    }
  },

  //ensure one marker container overlaps another when hovered over
  markerContainer: {
    position: 'absolute', 
    transform: 'translate(-50%, -50%)', 
    zIndex: 1, 
    '&:hover': { zIndex: 2 },
  },
  
  pointer: {
    cursor: 'pointer',
    margin: '5px 0px',
  },

  locationIcon: {
    color: 'orange',
  },

  closeButton: {
    position: 'absolute',
    top: 1,
    right: 1,
  },
}));