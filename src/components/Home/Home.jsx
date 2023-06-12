/*
  @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>

  @description:
    This React component serves as part of the landing page. It displays a welcome message to the logged-in 
    user, pressents some static text and an image, and provides a button for navigation to were users can find
    food options. It also includes a logout button for signed-in users with authentication and user management
    controlled by Firebase.

  Modified by Jason Su <y.su21@ncl.ac.uk> 02/05/23
  Added Firebase configuration for user greeting
*/

//Import necessary components and libraries
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LogoutIcon from '@mui/icons-material/Logout';
import BannerImage from "../../assets/home-banner-image.jpg";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import useStyles from './styles'
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';


const Home = () => {
  
  //State for logout status
  const [loggedOut, setLoggedOut] = useState(false);
  
  const classes = useStyles();

  //Initialise Firebase 
  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "nomnom-384201.firebaseapp.com",
      projectId: "nomnom-384201",
      storageBucket: "nomnom-384201.appspot.com",
      messagingSenderId: "81626286594",
      appId: "1:81626286594:web:e981f98ee006c19ee4751b",
      measurementId: "G-0DVRP5RKNH"
    };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  }, []);
  
  //Logout handle
   const handleLogout = () => {
    firebase.auth().signOut().then(function() {
      // User has logged out
      console.log('User is signed out.');
      window.location.href = '/';
    }).catch(function(error) {
      // An error occurred during the logout process
      console.log(error);
    });
  }

  //Get current user from AuthContext
  const {currentUser} = useContext(AuthContext);


  return (
    <div className={classes.homeContainer}>
      {/* Display the user's name if not logged out and if user exists */}
      {!loggedOut && currentUser && (
      <div className={classes.userName}>
        Hello, {currentUser.displayName ? currentUser.displayName.split(' ')[0]: 'User'}
      </div>
      )}

      <div className={classes.homeBannerContainer}>

        <div className={classes.homeTextSection}>
          <div className={classes.mainHeading}>
            <h1 className="primary-heading">
              Hungry...
            </h1>
          </div>
          
          <p className="primary-text">
            We've Got You Covered
          </p>
        </div>

        <div className={classes.homeImageSection}>
          <img alt="Image of food on a table" src={BannerImage} />
        </div>

      </div>
  
      <Link to="/results" className={classes.button}>
			  <button variant="contained" className={classes.findFoodButton}>
          Find Food <ArrowForwardIcon/>
        </button>
			</Link>	

      {/* Render the logout button if not logged out and if user exists */}
      {!loggedOut && currentUser && (
      <div className={classes.logOut}>
        <span>Not You?</span>
        <button id="logout-btn" className={classes.logOutButton} onClick={handleLogout}>
          Logout <LogoutIcon/>
        </button>
      </div>
      )} 
    </div>
  );
};

export default Home;