/*
    @author: Ray <h.lei3@newcastle.ac.uk>

    @description:
        This filter component is an interface for applying filters to a dataset. It's used to refine search results based on 
        multiple criteria. The component takes in 'closeFilter', 'applyFilter', and 'defaultValue' as props.
        The 'defaultValue' prop is used to initialise state variables.
*/

import './Filter.css'
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import LineAction from "./LineAction";
import {useState} from "react";
import BoderedBox from "./BoderedBox";
import CircleCheckBox from "./CircleCheckBox";
import CircleSwitch from "./CircleSwitch";
import Rating from "@mui/material/Rating";
import CircleSlider from "./CircleSlider";
import styled from "styled-components";
import RoundButton from "./RoundButton";
import {CssBaseline} from "@material-ui/core";

// a fixed bar at the bottom
const BottomBox = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`
// a content box to make room for a fixed field
const ContentBox = styled.div`
  padding-bottom: 100px;
`
// filter assembly
export default function Filter({closeFilter, applyFilter, defaultValue}) {
    const [data, setData] = useState({
        openNow: defaultValue.openNow ? defaultValue.openNow : false,
        priceRange: 1,
        distance: defaultValue.distance ? defaultValue.distance : [50, 2001],
        rating: defaultValue.rating ? defaultValue.rating : 0,
        dietary: defaultValue.dietary ? defaultValue.dietary : []
    })

    // Click the Apply button and execute the applyFilter callback function that was passed in, 
    // passing in the current data
    let apply = () => {
        applyFilter(data)
    }
    // switches the control s state change event handler
    let openNowChange = (e) => {
        data.openNow = e.target.checked
        setData(data)
    }
    // The state change event handler for the price range is commented out as we decided not to filter by this
    // given the requirements of an average price rather than price level
    let priceRangeChange = (e) => {
        data.priceRange = e.target.value
        setData(data)
    }

    // distance range state change event handler
    let distanceChange = (e, v) => {
        data.distance = v
        setData(data)
    }

    // Restaurant score state change event handler function
    let ratingChange = (e, v) => {
        data.rating = v == null ? 0 : v
        setData(data)
    }

    // A state change event handler for a particular dietary requirement that determines whether to add or 
    // remove based on the ADD parameter passed in
    let dietaryChange = (v, add) => {
        if (add) {
            data.dietary.push(v)
        } else {
            data.dietary = data.dietary.filter(d => d !== v)
        }
        setData(data)
    }

    return (
        <ContentBox>
            <CssBaseline/>
            <div className="filter-header-box">
                <CloseIcon className='filter-close' onClick={closeFilter}/>
                Refine
            </div>

            <div className={'content-box'}>
                <div className={'title-box'}>Sort</div>

                <BoderedBox>
                    <LineAction label={'Open Now'} Action={CircleSwitch} Icon={AccessTimeTwoToneIcon}
                                height={60}
                                checked={data.openNow}
                                onChange={openNowChange}/>
                </BoderedBox>

                {/* <BoderedBox title={'price range'}>
                    <RadioGroupLine onChange={priceRangeChange}/>
                </BoderedBox> */}

                <BoderedBox title={'distance'}>
                    <CircleSlider defaultValue={data.distance} onChange={distanceChange}/>
                </BoderedBox>

                <BoderedBox title={'restaurant rating'}>
                    <LineAction defaultValue={data.rating} label={'Rating'} Action={Rating} onChange={ratingChange}/>
                </BoderedBox>

                <BoderedBox title={'dietary'}>
                    <LineAction label={'Vegan'} Action={CircleCheckBox}
                                checked={data.dietary.includes('Vegan')}
                                onChange={e => dietaryChange('Vegan', e.target.checked)}
                    />
                    <LineAction label={'Vegetarian'} Action={CircleCheckBox}
                                checked={data.dietary.includes('Vegetarian')}
                                onChange={e => dietaryChange('Vegetarian', e.target.checked)}
                    />
                    <LineAction label={'Gluten-Free'} Action={CircleCheckBox}
                                checked={data.dietary.includes('Gluten-Free')}
                                onChange={e => dietaryChange('Gluten-Free', e.target.checked)}
                    />
                </BoderedBox>
            </div>

            <BottomBox>
                <RoundButton variant="contained" onClick={apply}>APPLY</RoundButton>
            </BottomBox>
        </ContentBox>
    )
}