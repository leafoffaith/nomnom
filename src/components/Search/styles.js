/*
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>
    
    @description:
        This file styles the Home React component using Material UI's makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

    search: {
        position: 'relative',
    },

    searchContainer: {
        position: 'relative',
        borderRadius: '10px',
    },

    searchIcon: {
        padding: '0 10px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    //'& [type="text"] used to overview material ui styles
    input: {
        paddingLeft: '20px',
        '& [type="text"]': {border: 'none', marginBottom: '0px'}
    },
   
    box: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '2px solid #ccc',
    }
}));




