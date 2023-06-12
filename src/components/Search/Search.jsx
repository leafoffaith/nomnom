/*
	@author Kevin Gao <c2036306@newcastle.ac.uk>

	@description:
		This component is used to implement the search function for users to search any place.
		It is responsible for rendering a search bar that allows users to search for a location. 
		Once a location is selected from the dropdown menu, the "onPlaceChanged" function extracts the latitude and 
		longitude of the selected location and passes it to the "setCoordinates" function. 
		"useState" to manage the state of "autocomplete". 
		The "onLoad" function initializes "autocomplete" with the Autocomplete instance.
*/

import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { InputBase, Box } from '@material-ui/core';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'

const Search = ({ setCoordinates }) => {

	const classes = useStyles();

	const [autocomplete, setAutocomplete] = useState(null);

	const onLoad = (autocomplete) => {
		setAutocomplete(autocomplete);
	};

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			const lat = autocomplete.getPlace().geometry.location.lat();
			const lng = autocomplete.getPlace().geometry.location.lng();
			setCoordinates({lat, lng});
		}
	};

	return (
		<div className={classes.searchContainer}>
			<Box display="flex" className={classes.box}>				
				<Autocomplete onLoad={autocomplete => setAutocomplete(autocomplete)} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
						<div className={classes.input}>				
                        	<InputBase 					
								placeholder='Enter your location'
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
							/>
						</div>	
                    </div>
                </Autocomplete>
			</Box>
		</div>
	);
};

export default Search;
