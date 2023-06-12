/*
    @author: Kevin Gao <c2036306@newcastle.ac.uk>

    @description:
        This react component is used to display the information of the restaurant in the Map,
        like review numbers, Price, Distance , Walking Time, Open status.
        The distance and walking time are calculated based on the user's location and the restaurant's location. 
        This widget is built with React and Material-UI libraries, and accepts a restaurant object and
        a refProp through props (which is a reference passed from the parent component used to scroll to the selected location).

    Modified by @author Claudia McMaster <c.mcmaster2@ncl.ac.uk> 03/05/23
    Added TripAdvisor and Website Card Actions to MiniListDetails
*/

import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardActions, Chip, CardMedia, CardContent, Grid, useMediaQuery } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Phone } from '@material-ui/icons';
import Rating from '@mui/material/Rating';
import useStyles from './styles';

// define function deg2rad  V4.27:get distance
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

const MiniPlaceDetails = ({ place, selected, refProp }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');

    //get distance
    const [distance, setDistance] = useState(null);

    const SPEED = 6;

    useEffect(() => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(

            (position) => {                
                // Calculate distance between user and place using haversine formula
                const lat1 = position.coords.latitude;
                const lon1 = position.coords.longitude;
                const lat2 = place.latitude;
                const lon2 = place.longitude;
                const R = 6371; // radius of the earth in km
                const dLat = deg2rad(lat2 - lat1);
                const dLon = deg2rad(lon2 - lon1);
                const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) *                
                    Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = R * c;    
    
                // Set distance state
                setDistance(d.toFixed(1)); // Round to 1 decimal place
            },

            (error) => {
                console.error(error);
            }
        );
    }, [place]);
    
    //the below code is to scroll to the selected place using 
    //the refProp that we passed in from the parent component (Map.jsx)
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    console.log(place);

    return (
        // Elevation is a nice shadow effect that we're getting
        <Card elevation={6} style={{ hight: '350px' }}>
            <CardContent>
                <Grid container spacing={isMobile ? 2 : 0}>
                    <Grid item xs={12} md={6}>                
     
                        {/* Gutter bottom will give some margin */}
                        <Typography gutterBottom variant="h6">
                            {place.name}
                        </Typography>

                        <Box display="flex" justifyContent="space-between">
                            <Rating value={Number(place.rating)} readOnly />
                            {/* Get price level $ $$ $$$ */}
                            <Typography gutterBottom variant="subtitle1">
                                out of {place.num_reviews} review{place.num_reviews > 1 ? 's' : ''}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Price</Typography>
                            {/* Get price level */}
                            <Typography gutterBottom variant="subtitle1">
                                {place.price}
                            </Typography>
                        </Box>            

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Distance</Typography>
                            <Typography gutterBottom variant="subtitle1">
                            {distance ? `${distance} km` : 'Calculating...'}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Walking Time:</Typography>
                            <Typography gutterBottom variant="subtitle1">
                            {distance && `${(distance / SPEED * 60).toFixed(1)} mins`}
                            </Typography>
                        </Box>


                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Open Now:</Typography>
                            {/* Get price level $ $$ $$$ */}
                            <Typography gutterBottom variant="subtitle1">
                                {place?.opening_hours?.open_now ? 'Yes' : 'No'}
                            </Typography>
                        </Box> 

                        {/* https://dev.to/andyrewlee/how-to-dynamically-render-components-in-react-4n7g */}
                        {/* The question mark ensure that you absolutely have something before rendering it */}
                        {place?.cuisine?.map(({ name }) => (
                            // Chip is a straightforward way to display a list of items
                            // Key is the unique identifier for each chip
                            // Size is the size of the chip
                            // Label is the text that will be displayed
                            // className is the styling that we're applying to the chip
                            <Chip key={name} size="small" label={name} className={classes.chip} />
                        ))}

                        {/* Address of the restaurant */}
                        {/* If address exists then give address */}
                        {place?.address && (
                            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                                <LocationOnIcon /> {place.address}
                            </Typography>
                        )}

                        {/* Phone number of the restaurant */}
                        {/* If phone number exists then give phone number */}
                        {place?.phone && (
                            <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                                <Phone /> {place.phone}
                            </Typography>
                        )}

                        <CardActions>
                        {/* Window open accepts a second param to open a new tab instead of replacing our own website */}
                            <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                                Trip Advisor
                            </Button>
                            <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                                Website
                            </Button>
                        </CardActions>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.imageContainer}>
                        <CardMedia
                            style={{
                                width: isMobile ? '100%' : '100%',
                                paddingTop: isMobile ? '56.25%' : '100%', // 16:9 aspect ratio for mobile, 1:1 aspect ratio for larger screens
                                position: 'relative',
                            }}
                            image={                          //This image is used when loading or cant find image of restaurant.
                                place.photo ? (place.photo.images.large.url) : (                                    
                                    'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                )
                            }
                            title={place.name}
                            className={classes.image}
                        />
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

export default MiniPlaceDetails;
