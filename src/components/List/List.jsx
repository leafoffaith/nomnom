/* 
    @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500 

    @description: 
        This component is responsible for rendering the list of restaurants.
        It also renders the loading icon when the data is being fetched from the API.
        It uses refs to scroll to the selected restaurant.
        It also uses the useMediaQuery hook to make the app responsive.

    @reference:
        Code referenced from
        https://github.com/adrianhajdin/project_travel_advisor
        https://gist.github.com/adrianhajdin/ede527249054b7abbdf4e3a9fac95b5e
        authored by https://github.com/adrianhajdin
        Licensed under MIT License
*/

import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { useMediaQuery } from '@mui/material';
import useStyles from './styles';


const List = ({ places, childClicked, isLoading, rating, setRating }) => {
    const classes = useStyles();
    //first is a state, second is a function that modifies the state

    const [elRefs, setElRefs] = useState([]);

    const isMobile = useMediaQuery('min-width: 600px)');

    //Not used anymore
    // const places = [
    //     { name: 'Hugo' },
    //     { name: 'Babucho' },
    //     { name: 'Tesco' }
    // ]

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());

        setElRefs(refs);
    }, [places])

    return (
        //dont render card if there is no place
        <div className={classes.container}>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    //if there is no place, dont render card
                    // This is not a good practice if need to delete item
                    //From xs to xl, 12 columns will be taken up
                    //check if there is an ad_position, if there is, dont render the card as it displays an empty card
                     !place.ad_position && ( <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                        place={place} 
                        selected={Number(childClicked) === i}
                        //refProp is a prop that we are passing to the PlaceDetails component
                        refProp={elRefs[i]}
                        />
                    </Grid>
                     )
                ))}
            </Grid>
            </>
            )}
        </div>
    )
}

export default List;