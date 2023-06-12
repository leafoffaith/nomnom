/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        It creates a checkbox using the Checkbox component from the Material-UI library. 
        It uses Styled Components to customize the appearance of the checkbox, 
        including a circular background and an icon containing a checkmark. When selected, the background color and icon change. 
        It also disables the ripple effect. This component can receive and pass all standard Checkbox properties.
*/

import './Shared.css'
import {size} from './shared'
import {Checkbox, styled} from "@mui/material";

//Defines a component named BpIcon that uses Material-UI's styled function to create a styled <span> element
const BpIcon = styled('span')(({theme}) => ({
    borderRadius: size / 2,
    width: size,
    height: size,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? 'var(--text-color)' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

//A component called BpCheckedIcon is defined, which inherits the previously defined BpIcon component and modifies its style a bit to represent the icon in the checked state.
const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: 'var(--main-color)',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: size,
        height: size,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: 'var(--main-hover-color)',
    },
});

export default (props) => {
    return (
        <Checkbox
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon/>}
            icon={<BpIcon/>}
            inputProps={{'aria-label': 'Checkbox demo'}}
            {...props}
        />
    );
}
