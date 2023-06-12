/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        This code defines a custom Switch component that is based on the Switch component
        and uses the styled function to modify its styles.
*/

import './Shared.css'
import {size} from './shared'
import {styled, Switch} from "@mui/material";

export default styled(Switch)(({theme}) => ({
    // control the width and height of the entire switch
    width: size * 1.8,
    height: size,
    padding: 0,
    display: 'flex',
    // the style of the switch when it is active
    '&:active': {
        '& .MuiSwitch-thumb': {
            // control the width of the ball
            width: size - 1,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            // control the position of the entire switch
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        // Control the spacing between the ball and the background
        padding: 2,
        '&.Mui-checked': {
            transform: `translateX(${size - 4}px)`,
            color: '#fff',
            '& + .MuiSwitch-track': {
                // Controls the color and transparency of the switch background
                opacity: 1,
                backgroundColor: 'var(--main-color)',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        // Controls how the ball's shadows, size, border fillet, and width change
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: size - 4,
        height: size - 4,
        borderRadius: (size - 4) / 2,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        // Controls the fillet, transparency, and color of the switch background
        borderRadius: size / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));