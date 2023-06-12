/*
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>

    @description:
        This file styles the category card react components using material-ui makeStyles.
*/

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

    //Styles the container holding all the category cards
    //to center horizontally and allow horizontal scrolling
    categoryCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
    },
    
    //Styles individual card container
    //Uses flexbox and takes up full width of the parent
    cardContainer: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        margin: '25px 0',
    },

    //Styles individual category card
    //Stacks the items in the card vertically and centered. Changes the background colour when hovered    
    categoryCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9E9E9',
        width: '5rem',
        height: '6rem',
        '&:hover': {backgroundColor: '#fe9e0d', cursor: 'pointer'},   
    },

    //Media query for the card component to ensure cards don't overlap for smaller screens
    card: {
        '@media (max-width: 370px)': {minWidth: '80px', minHeight: '96px'},
    },
    
    //Style for image inside the card to be a fixed size
    cardMedia: {
        width: '100%',
        maxWidth: '3rem',
        margin: '0',
        paddingTop: '17px',
    },

    //Style for the title inside the card to be centered   
    cardContent: {
        textAlign: 'center',
        paddingBottom: '0px',
    },

    //When card is selected as the filter an orange border is shown
    selectedCard: {
        backgroundColor: '#fe9e0d',
        border: 'orange 4px solid',
    },

}));