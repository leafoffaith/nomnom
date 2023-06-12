/* 
    @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500 

    @description: 
        This is the page that displays the results of the search. 
        It contains the header, search bar, map, list, and filter.
        It also contains the logic for the search bar, map, list, and filter.
    
    @reference:
        Code referenced from
        https://github.com/adrianhajdin/project_travel_advisor
        authored by https://github.com/adrianhajdin
        Licensed under MIT License

    Modified by @author Ray <h.lei3@newcastle.ac.uk> 08/05/23
    Adding filter, snackbar and alert components

    Modified by @author Claudia McMaster <c.mcmaster2@ncl.ac.uk>
    Added handler for showing map and lsit displays

*/


import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Box, Button, Collapse, Grid} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//import components
import Header from '../components/Header/Header';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import Search from '../components/Search/Search';
import List from '../components/List/List';
import Map from '../components/Map/Map';

import getPlacesData from '../api';
import Filter from "../components/Filter/Filter";

const ResultsPage = () => {

    //states
    //state for places
    const [places, setPlaces] = useState([]);

    //state for filtered places
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    //state for type of places
    const [showSearch, setShowSearch] = useState(false);

    //state for child clicked
    const [childClicked, setChildClicked] = useState(null);

    //state for coordinates
    const [coordinates, setCoordinates] = useState({});

    //state for address
    const [address, setAddress] = useState('');

    //state for bounds
    const [bounds, setBounds] = useState({});

    //state for rating
    const [rating, setRating] = useState('');

    //state for loading
    const [isLoading, setLoading] = useState(false);

    //state for open
    const [showList, setShowList] = useState(false);

    //state for map display
    const [mapDisplay, setMapDisplay] = useState('block');

    //state for cuisine
    const [cuisine, setCuisine] = useState('')

    //state for filter
    const [showFilter, setShowFilter] = useState(false)

    //state for filter condition
    const [filterCondition, setFilterConditions] = useState({})

    //state for filter
    const [isFiltering, setIsFiltering] = useState(false)

    //state for message
    const [message, setMessage] = useState({
        open: false,
        content: "No matching restaurants found."
    });

    //state for open
    const {content, open} = message;

    //handler for close
    let closeFilter = () => {
        setShowFilter(false)
        if (!showList) {
            setMapDisplay('block')
        }
    }

    //async function to get places data
    const getAddressFromCoordinates = async (coordinates) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({location: coordinates}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setAddress(results[0].formatted_address);
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });
    };

    //useEffect that runs when coordinates change
    useEffect(() => {
        getAddressFromCoordinates(coordinates);
    }, [coordinates]);

    //useEffect that runs when address changes
    useEffect(() => {
        if (cuisine !== '' && places) {
            let res = places.filter(place =>
                place.cuisine ? place.cuisine?.map(c => c.name.toLocaleLowerCase()).includes(cuisine) : false)
            setFilteredPlaces(res)
            if (res.length == 0) {
                setMessage({
                    open: true,
                    content: "No matching restaurants found. All restaurants will be displayed."
                })
            }
        } else {
            setFilteredPlaces([])
        }
        console.log(filteredPlaces);
    }, [cuisine, places]);


    //useEffect that runs when filteredPlaces changes
    useEffect(() => {
        console.log(filterCondition)
        let srcPlaces = places
        if (!srcPlaces) {
            srcPlaces = []
        }
        // filter closed
        if (filterCondition.openNow) {
            srcPlaces = srcPlaces.filter(p => !p.open_now_text?.includes("Closed"))
        }
        // filter price
        if (filterCondition.priceRange) {
            srcPlaces = srcPlaces.filter(p => {
                if (!p.price_level) {
                    return false
                }
                let pl = p.price_level.split("-")
                if (pl.length > 1) {
                    return pl[1].trim().length > filterCondition.priceRange
                } else {
                    return pl[0].trim().length > filterCondition.priceRange
                }
            })
        }
        //filter distance
        if (filterCondition.distance) {
            srcPlaces = srcPlaces.filter(p => {
                let placeDistance = parseFloat(p.distance)
                let isNeed = placeDistance >= filterCondition.distance[0] / 1000
                if (filterCondition.distance[1] <= 2000) {
                    isNeed = isNeed && placeDistance <= filterCondition.distance[1] / 1000
                }
                return isNeed
            })
        }
        // filter rating
        if (filterCondition.rating > 0) {
            srcPlaces = srcPlaces.filter(p => Number.parseInt(p.rating) === filterCondition.rating)
        }
        // filter dietary
        if (filterCondition.dietary && filterCondition.dietary.length > 0) {
            srcPlaces = srcPlaces.filter(p => {
                let dietary = p.dietary_restrictions.map(v => v.name).join()
                for (let d of filterCondition.dietary) {
                    if (dietary.includes(d)) {
                        return true
                    }
                }
                return false
            })
        }
        setFilteredPlaces(srcPlaces)
        if (isFiltering && srcPlaces.length === 0) {
            setMessage({
                open: true,
                content: "No matching restaurants found. All restaurants will be displayed."
            })
        }
        setIsFiltering(false)
        console.log("filteredPlaces:", srcPlaces);
    }, [filterCondition])


    useEffect(() => {
        //gets the current location of the user
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        //rating
        if (places) {
            const filteredPlaces = places.filter((place) => place.rating > rating);
            setFilteredPlaces(filteredPlaces);
        }
    }, [rating]);

    useEffect(() => {
        //set loading to true
        setLoading(true);

        console.log(coordinates, bounds);
        //returns restaurants and cafes in 1500m radius of the coordinates
        //.then is needed cause getPlacesData is async
        //check /api/index.js
        getPlacesData(bounds).then((data) => {
            console.log(data);
            setPlaces(data);
            //set loading to false
            setLoading(false);
            //set filtered places to all places
            setFilteredPlaces([]);
        });
        //the empty array means that this useEffect will only run once
        //if we want it to run everytime the coordinates change, we can add coordinates to the array
        //if we want it to run everytime the bounds change, we can add bounds to the array
    }, [coordinates, bounds]);


    return (
        <>
            {showFilter ?
                <Filter defaultValue={filterCondition}
                        closeFilter={closeFilter}
                        applyFilter={data => {
                            setIsFiltering(true)
                            setFilterConditions(data);
                            closeFilter()
                        }}/> :
                <>

                    <Header/>
                    <div>
                        <Box display="flex" className="box" flexDirection='row' sx={{paddingBottom: '10px'}}>
                            <LocationOnIcon/>
                            <span>{address}</span>

                            <KeyboardArrowDownIcon
                                onClick={() => setShowSearch(!showSearch)}
                            />
                        </Box>

                        <Collapse in={showSearch}>
                            <Search setCoordinates={setCoordinates}/>
                        </Collapse>
                    </div>

                    <CategoryCard onClick={setCuisine}/>

                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant='contained'
                                style={{
                                    backgroundColor: 'orange',
                                    height: '50px',
                                    width: '120px'
                                }}
                                onClick={() => {
                                    setShowList(!showList);
                                    setMapDisplay(mapDisplay === 'block' ? 'none' : 'block');
                                }}
                            >
                                {showList ? "Show Map" : "Show List"}
                            </Button>
                        </Grid>

                        <Grid item>
                            <Link onClick={() => {
                                setShowFilter(true)
                                setMapDisplay('none')
                            }}>
                                <Button
                                    variant='contained'
                                    style={{
                                        backgroundColor: 'orange',
                                        height: '50px',
                                        width: '120px'
                                    }}
                                >
                                    Filter
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>

                    {showList && (
                        <Box
                            zIndex='1'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            height='100%'
                            width='100%'
                        >
                            <List
                                places={filteredPlaces.length ? filteredPlaces : places}
                                childClicked={childClicked}
                                isLoading={isLoading}
                                rating={rating}
                                setRating={setRating}
                            />
                        </Box>
                    )}
                </>
            }
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                sx={{height: "100vh", width: '85vw', position: "relative", paddingLeft: '15vw'}}
            >
                <Box
                    position='absolute'
                    height='100%'
                    width='100%'
                    display={mapDisplay}
                >
                    <Map
                        className='map'
                        setCoordinates={setCoordinates}
                        // setBounds for the api call
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        showList={showList}
                        setShowList={setShowList}
                    />
                </Box>
            </Grid>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                autoHideDuration={3000}
                open={open}
            >
                <Alert onClose={() => setMessage({open: false, content: ""})} severity="warning" sx={{width: '100%'}}>
                    {content}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ResultsPage;