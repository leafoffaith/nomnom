/*
  @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk

  @description:
    This file is an Authentication Provider that uses Firebase for user authentication. It leverages React's Context API to 
    provide a centralised way to share the user's authentication state across the application. 
*/

//Import necessary dependencies
import React, { createContext, useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//Create a context for auth
export const AuthContext = createContext();

//Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //state to hold the current user
  const [loading, setLoading] = useState(true); //state to hold the loading status

  //Firebase configuration
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCjV-OYu9wajMGgcnTv_w2PlvE7ulJzdTo",
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
  } else {
    firebase.app();
  }

  //Set an observer for changes in user auth state
  firebase.auth().onAuthStateChanged((user) => {
    setCurrentUser(user); //Set the current user
    setLoading(false); //Set loading to false after getting user status
    });
  }, []);

  //If still loading, return a loading message
  if (loading) {
    return <>Loading...</>; 
  }

  //If not loading, return the AuthProvider with the current user
  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};