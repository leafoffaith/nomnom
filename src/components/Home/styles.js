/*
    @author Claudia McMaster <c.mcmaster2@ncl.ac.uk>

    @description:
        This file styles the Home React component using Material UI's makeStyles
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    
    //Responsive design for home container
    homeContainer: {
        '@media (max-width: 600px)': {padding:'4vw'},
    },

    //Styles username text
    //Aligns to center by default but changes to left-aligned for larger screens
    userName: {
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '16pt',
        color: 'grey',
        '@media (min-width: 800px)': {textAlign:'left'},
    },

    //Style for the container add the banner section
    //For smaller screens, this will be displayed in a column and in a row for larger screens
    homeBannerContainer: {
        position: 'relative',
        display: 'flex',
        '@media (max-width: 800px)': {flexDirection:'column-reverse', alignItems: 'center', justifyContent: 'center'},      
    },

    //Styling for the main heading and subtext of the home page
    //Text is left aligned for larger screens and centered on smaller screens
    homeTextSection: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        '@media (max-width: 800px)': {justifyContent:'center', alignItems:'center',}
    },

    mainHeading: {
        paddingBottom: '1.5rem',
    },

    //Ensures responsiveness for the image on the home page
    homeImageSection: {
        maxWidth: '1000px',
        flex: '1',
        '@media (max-width: 800px)': {width:'100%', maxWidth:'400px'}
    },

    button: {
        textDecoration: 'none',
    },

    //Style for the find food button
    //Adds change of background colour on hover and targets SVG icon inside the button
    findFoodButton: {
        backgroundColor: '#FE9E0D',
        outline: 'none',
        border: 'none',
        borderRadius: '5rem',
        fontSize: '12pt',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        width: '120px',
        color: 'white',
        '&:hover': {backgroundColor: 'black'},
        '& svg': {marginLeft: '0.75rem', fontSize: '1.5rem'},
    },

    logOut: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '200px',
        '& span': {paddingRight: '10px'}
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

