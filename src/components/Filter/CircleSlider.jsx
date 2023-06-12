/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        This code creates a custom circular slider and uses it as a React component for use in the front-end application.
*/

import {Slider, styled as changeStyle} from "@mui/material";
import styled from 'styled-components'
import './Shared.css'

const SliderBox = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  padding: 0 10px;
  align-items: end;
`

const MySlider = changeStyle(Slider)(({}) => ({
    color: 'var(--main-color)',
    height: '0.5rem',
    borderRadius: '0.25rem',
    '& .MuiSlider-thumb': {
        height: '1.5rem',
        width: '1.5rem',
        '&.Mui-focused, &:hover, &.Mui-active, &.Mui-selected': {
            boxShadow: 'none !important',
        },
        '& .MuiSlider-valueLabel': {
            backgroundColor: '#ebebeb',
            color: 'var(--text-color)',
            padding: '8px 5px',
            borderRadius: 10
        }
    },
    '& [data-index="0"].MuiSlider-markLabel': {
        transform: 'translateX(1px)'
    },
    '& [data-index="1"].MuiSlider-markLabel': {
        transform: 'translateX(-50px)'
    }
}))

const CircleSlider = (props) => {
    return (
        <SliderBox>
            <MySlider
                min={50}
                max={2010}
                valueLabelDisplay='on'
                valueLabelFormat={v => v > 2000 ? '2000m+' : `${v}m`}
                marks={[
                    {
                        value: 50,
                        label: '50m',
                    },
                    {
                        value: 2001,
                        label: '2000m+',
                    }
                ]}
                {...props}
                disableSwap>
            </MySlider>
        </SliderBox>
    )
}

export default CircleSlider
