/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        The code creates a custom radio button component. It uses Material-UI's Radio component and defines
        two different style components for it, one for the unselected state icon and
        the other for the selected state icon. It also defines a RadioGroupLineBox container
        component and a RadioGroup component for grouping Radio components into radio button groups.
        This component accepts a props object that can be passed to the RadioGroup component. Ultimately,
        the component renders as a group of three radio buttons, each displaying a different currency symbol.
*/

import {size} from './shared'
import {FormControl, FormControlLabel, Radio, RadioGroup, styled as makeStyle} from "@mui/material";
import styled from "styled-components";

// Create a styled component for a circular icon for the radio button
const BpIcon = makeStyle('span')(({theme}) => ({
    borderRadius: '50%',
    width: size - 4,
    height: size - 4,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
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

// Create a styled component for the checked radio button icon
const BpCheckedIcon = makeStyle(BpIcon)({
    backgroundColor: 'var(--main-color)',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: size - 4,
        height: size - 4,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: 'var(--main-hover-color)',
    },
});

// Define a functional component for the custom radio button using the above styles
function MyRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon/>}
            icon={<BpIcon/>}
            {...props}
        />
    );
}

// Create a styled component for a container div for the radio button group
const RadioGroupLineBox = styled.div`
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`
// Define a functional component for the radio button group using the custom radio button
export default (props) => {
    return (
        <RadioGroupLineBox>
            <FormControl>
                <RadioGroup
                    row
                    defaultValue={1}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    {...props}
                >
                    <FormControlLabel value={1} control={<MyRadio/>} label="£"/>
                    <FormControlLabel value={2} control={<MyRadio/>} label="££"/>
                    <FormControlLabel value={3} control={<MyRadio/>} label="£££+"/>
                </RadioGroup>
            </FormControl>
        </RadioGroupLineBox>
    )
}