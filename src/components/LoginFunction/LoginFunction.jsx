/*
  @author: Jason Su <y.su21@ncl.ac.uk>

  @description:
    This component acts as an interface between the Firebase Authentication system and the user. 
    It uses Firebase UI for a streamlined sign-in process. When the component is loaded, the Firebase
    is initialised with the provided configuration and the FirebaseUI is set up to handle user
    authentication. If the user is already signed in, they are redirected to the user account page, 
    if not, the FirebaseUI login widget is displayed. This component makes use of Material-UI for
    layout and styling.

  Modified by @author Claudia McMaster <c.mcmaster2@ncl.ac.uk> 03/05/23
  Added mui avatar and styling
*/

//Required modules and components imported
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firebaseui from 'firebaseui';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import "./styles.css";

const LoginFunction = () => { 
  
  useEffect(() => {
    //Configure the Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCjV-OYu9wajMGgcnTv_w2PlvE7ulJzdTo",
      authDomain: "nomnom-384201.firebaseapp.com",
      projectId: "nomnom-384201",
      storageBucket: "nomnom-384201.appspot.com",
      messagingSenderId: "81626286594",
      appId: "1:81626286594:web:e981f98ee006c19ee4751b",
      measurementId: "G-0DVRP5RKNH"
    };

    //Initialize Firebase with provided configuration
    firebase.initializeApp(firebaseConfig);

    //FirebaseUI configuration - Specifies the URL to redirect to after successful sign-in
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [   {     
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, 
        requireDisplayName: true
      }
      ],
    };

    //FirebaseUI is initialised and tied to the Firebase auth instance
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    //Listen for changes in the user's authentication state
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in
        console.log(user);
         window.location.href = "/user-account";
      } else {
        // User is not signed in
        console.log('User is not signed in.');
      }
    });

    //Attach the FirebaseUI login widget to the DOM element with given ID
    ui.start('#firebaseui-auth-container', uiConfig);

    // Initialize Firestore
    const db = firebase.firestore();
  }, []);


  return (
    <Container component="main" maxWidth="xs">
      <Box
        className='box'
      >
        <Avatar sx={{backgroundColor:'orange'}}className='icon'>
          <LockOutlinedIcon />
        </Avatar>
        <div className="login-container"> 
            <div id="firebaseui-auth-container"></div>
        </div>
      </Box>
    </Container>
  );
};

export default LoginFunction;
