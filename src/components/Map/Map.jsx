/* 
    @co-authors: 
        Shaurya Dey <s.dey2@ncl.ac.uk> 220025500
        Claudia McMaster <c.mcmaster2@ncl.ac.uk>

    @description:
        This map component displays a Google Map with various places marked in it by making use of Material-UI and Google 
        Map React libraries. Map takes several props including 'setCoordinates', 'setBounds', 'coordinates', 'places' and
        'setChildClicked'. These are used to manage the state of the map, such as current coordinates and the bounds 
        of the map. 

    Modified by Claudia McMaster <c.mcmaster2@ncl.ac.uk>
    Added options to Google Map React, updated MiniList to change with selectedPlace state variable and
    added paper component for when on mobile view
*/

//Import required libraries and components
import React, {useState, useEffect, useRef} from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, IconButton, Grid, Button } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import MiniList from '../MiniList/MiniList';
import useStyles from './styles'

export default function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked, }) {

	const classes = useStyles();

	//useMediaQuery for responsive
	const isMobile = useMediaQuery('(max-width: 600px)');

    //States to keep track of the selected place, if the mini list should be displayed and the Google Map instance
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showMiniList, setShowMiniList] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);

    //Handler for closing the selected place and hiding the mini list
    const handleClose = () => {
        setSelectedPlace(null);
        setShowMiniList(false);
    };

    const options = {
        gestureHandling: 'greedy',
        disableDefaultUI: true,
    }

	return (
		<div className={classes.mapContainer}>

            {/* Render the Google Map if the coordinates are valid */}
            {!isNaN(coordinates.lat) && !isNaN(coordinates.lng) && ( 
                <GoogleMapReact
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    // Replace API key with the following: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                    defaultCenter={coordinates}
                    defaultZoom={14}
                    center={coordinates}
                    margin={[50, 50, 50, 50]}
                    options={options}
                    //Update the coordinates and bounds when the map changes
                    onChange={(e) => {                    
                        console.log(e);                
                        setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                        setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                    }}
                    //Set the clicked child and selected place when a marker is clicked
                    onChildClick={(child) => {
                        setChildClicked(child);
                        setSelectedPlace(places[child]);
                    }}                     
                >

                    {/* Loops through the array of places and create a marker for each place on the map*/}
                    {places?.map((place, i) => (
                        <div 
                            className={classes.markerContainer}
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            key={i}
                        >    
                            <LocationOnIcon className={classes.locationIcon} fontSize='large' />                                                               
                        </div>
                    ))}

                    {/* If on a mobile device and a place is selected, show a more detailed view of the place on the map                                    */}
                    {isMobile && selectedPlace && (                    
                        <div                    
                            className={classes.paperContainer}
                            lat={Number(selectedPlace.latitude)}
                            lng={Number(selectedPlace.longitude)}
                        >                   
                            <Paper 
                                className={classes.paper}
                            >
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    size="small"
                                    onClick={handleClose}
                                    className={classes.closeButton}
                                >
                                    <CloseIcon />
                                </IconButton>

                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {selectedPlace.name}
                                </Typography>

                                {/* Display the photo of the selected place, if available. If not, display a placeholder image */}
                                <img
                                    className={classes.pointer}
                                    src={
                                        selectedPlace.photo                                
                                        ? selectedPlace.photo.images.large.url                                    
                                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                    }
                                    alt={selectedPlace.name}
                                    onClick={() => setShowMiniList(!showMiniList)} //toggle mini list when clicked on image
                                />                        

                                <Rating size="small" value={Number(selectedPlace.rating)} readOnly />
                            </Paper>
                        </div>
                    )}
                </GoogleMapReact>
            )}           
        
            {/* If not on a mobile device, always show the MiniList component */}
            {!isMobile && (
                <div className={classes.miniListContainer}>
                <MiniList
                    places={selectedPlace ? [selectedPlace] : []}
                    childClicked={null}
                    isLoading={false}
                />
                </div>
            )}   
        
            {/* If on a mobile device and image on paper component has been clicked, show the miniList component  */}
            {isMobile && showMiniList && (
                <div className={classes.miniListContainer}>
                <MiniList
                    places={selectedPlace ? [selectedPlace] : []}
                    childClicked={null}
                    isLoading={false}
                />
                </div>
            )}
                            
        </div>
    );
};
