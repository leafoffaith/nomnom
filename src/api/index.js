/* 
     @author: Shaurya Dey <s.dey2@ncl.ac.uk> 220025500 

    @description: 
        Handles the API calls to the travel advisor API.
        
    @reference:
        Code referenced from
        https://github.com/adrianhajdin/project_travel_advisor
        authored by https://github.com/adrianhajdin
        Licensed under MIT License
*/

//This is where we will create our API routes.

//import axios
import axios from 'axios';
// const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


const getPlacesData = async (bounds) => {
    try {
        // destructure data from response
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`, {
            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
                currency: 'GBP'
            },

            headers: {
                // ADD TRAVEL ADVISOR API KEY HERE
                //Replace API key with React App API key in env called REACT_APP_RAPIDAPI_API_KEY
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const filterPlaces = (places, type) => places.filter((place) => place.type === type);

export default getPlacesData;
