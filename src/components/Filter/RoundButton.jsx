/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description: 
        Defines a styled component called RoundButton, which is a button with rounded corners, a fixed height and width,
        and a background with a primary color and a hover color. This component is exported as the default export of this module
*/

// Import necessary modules and files
import './Shared.css'
import {styled} from "@mui/material";
import {Button} from "@material-ui/core";

// Define the RoundButton component and style it using MUI styled function
const RoundButton = styled(Button)(({theme}) => ({
    // Set the color of the button text to white
    color: '#fff',
    // Set the height of the button to 50 pixels
    height: 50,
    // Set the width of the button to 80% of its container and center it horizontally with auto
    width: '80%',
    margin: '15px auto 0',
    display: 'block',
    // Set the button border radius to 25 pixels to make it round
    borderRadius: 25,
    // Set the background color of the button to the main color defined in the CSS variables
    backgroundColor: 'var(--main-color)',
    // Set the background color of the button to the main hover color when it is hovered over by the mouse
    '&:hover': {
        backgroundColor: 'var(--main-hover-color)',
    },
}));
// Export the RoundButton component as the default export of the module
export default RoundButton