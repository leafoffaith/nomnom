/* 
    @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500 

    @description: 
        PlaceDetails component is responsible for rendering the details of a restaurant.
        The props it receives are place, selected and refProp.
        Place prop is the restaurant object.
        Selected prop is a boolean that tells us if the restaurant is selected or not.
        refProp is a reference to the ref that we created in the parent component (Map.jsx).
        It uses: 
            the Rating component from Material UI to display the rating of the restaurant.
            the Chip component to display the price level of the restaurant.
            the Phone and LocationOn icons from Material UI to display the phone number and address of the restaurant.

    @reference:
        Code referenced from
        https://github.com/adrianhajdin/project_travel_advisor
        https://gist.github.com/adrianhajdin/ede527249054b7abbdf4e3a9fac95b5e
        authored by https://github.com/adrianhajdin
        Licensed under MIT License
*/


import React from 'react';
import { Box, Typography, Button, Card, CardActions, Chip, CardMedia, CardContent } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Phone } from '@material-ui/icons';
import Rating from '@mui/material/Rating';

import useStyles from './styles';
import { useState, useEffect } from 'react';

function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

const PlaceDetails = ({ place, selected, refProp }) => {
	const classes = useStyles();
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
    if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

	console.log(place);

	return (
		// Elevation is a nice shadow effect that we're getting
		<Card elevation={6}>
			<CardMedia
				style={{ height: 350 }}
				image={
					place.photo ? (
						place.photo.images.large.url
					) : (
						'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
					)
				}
				title={place.name}
			/>
			<CardContent>
				{/* Gutter bottom will give some margin */}
				<Typography gutterBottom variant="h5">
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
					{/* Get price level $ $$ $$$ */}
					<Typography gutterBottom variant="subtitle1">
						{place.price}
					</Typography>
				</Box>
                
                <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Distance</Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {place.distance_string}
                        </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">Walking Time</Typography>
                        <Typography gutterBottom variant="subtitle1">
                        {distance && `${(distance / SPEED * 60).toFixed(1)} mins`}
                        </Typography>
                </Box>


                <Box display="flex" justifyContent="space-between">
					<Typography variant="subtitle1">{place.open_now_text}</Typography>
					{/* Get price level $ $$ $$$ */}
					{/* <Typography gutterBottom variant="subtitle1">
						{place?.opening_hours?.open_now ? 'Yes' : 'No'}
					</Typography> */}
				</Box>    

				<Box display="flex" justifyContent="space-between">
					<Typography variant="subtitle1">Ranking</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.ranking}
					</Typography>
				</Box>




                {/* Dynamic block */}
                {place?.awards?.map((award) => (
                    // award is an object
                    // my is margin 
                    // display flex to display the image and text in a row
                    // justifyContent space between to push the text to the right
                    // alignItems center to center the image and text
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name} />
                        {/* Typography explains the specific award */}
                        {/* Shows certificate of excellence */}
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
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
                {/* Buttons that take us to trip advisor website and restaurant website */}
                <CardActions>
                    {/* Window open accepts a second param to open a new tab instead of replacing our own website */}
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
                {/* If there are no reviews, then we don't want to show the reviews */}
			</CardContent>
		</Card>
	);
};

export default PlaceDetails;
