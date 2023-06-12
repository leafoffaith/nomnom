/*
    @author: Kevin Gao <c2036306@newcastle.ac.uk>

    @description:
        This react component is used to create a list to display the restaurant in the Map.
        Creates an array of references to child elements using the useState hook and updates,
        it using the useEffect hook when the places prop changes.

*/

import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid } from "@mui/material";
import MiniPlaceDetails from "../MiniListDetails/MiniListDetails";
import useStyles from './styles';

const MiniList = ({ places, childClicked, isLoading }) => {

    const classes = useStyles();
    //first is a state, second is a function that modifies the state
    const [elRefs, setElRefs] = useState([]);
    
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs);
    }, [places])

    return (
        <div className={classes.container}>

            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
                ) : (
                <>               
                <Grid container spacing={3} className={classes.list}>

                    {/* slice(0,1) is used to get the first(only) restaurant */}
                    {places?.slice(0, 1).map((place, i) => (
                        //This is not a good practice if need to delete item
                        //From xs to xl, 12 columns will be taken up
                        <Grid ref={elRefs[i]} item key={i} xs={12}>
                            <MiniPlaceDetails 
                                place={place} 
                                selected={Number(childClicked) === i}
                                //refProp is a prop that we are passing to the PlaceDetails component
                                refProp={elRefs[i]}
                            />
                        </Grid>
                    ))}
                </Grid>
                </>
            )}
        </div>
    )
}

export default MiniList;