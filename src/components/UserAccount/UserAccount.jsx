/*
    @author: Lucas Shi <k.shi6@newcastle.ac.uk>
    
    @description:
      The userAccount page displays user information, favourites and reviews. The favourites and reviews are hardcoded
      as time didn't allow to implement this functionality. It uses Firebase for authentication and logout functionality.

    Modified by Claudia McMaster <c.mcmaster2@ncl.ac.uk>
    Addition of AuthContext to display logged in username and Firebase to allow users to log out
*/

import React , {useContext} from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Avatar } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import data from '../../data/userFavourites.json';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReviewsIcon from '@mui/icons-material/Reviews';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import LogoutIcon from '@mui/icons-material/Logout';

import useStyles from './styles';
import { AuthContext } from '../AuthContext';

function UserAccount() {
  const classes = useStyles();

  const {currentUser}=useContext(AuthContext);

  //Function to handle logout
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

 
  return (
    <div className={classes.root}>      
      <Avatar sx={{backgroundColor:'orange'}} className={classes.icon}>
        <AccountCircleIcon className={classes.accountIcon}/>
      </Avatar>

      <Typography variant="h5" className={classes.userName}>{currentUser.displayName}</Typography>

      <button onClick={handleLogout} className={classes.logOutButton}>
        Logout <LogoutIcon/>
      </button>

      <div className={classes.favouritesAndReviews}>

        <div className={classes.favoritesContainer}>
          <FavoriteIcon />
          <Typography variant="h6">Favourites </Typography>
          
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >            
            {data.map((elem) => (
              <Grid
                item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}                
                    component="img"
                    image={elem.image}
                  />

                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="p" style={{fontWeight: 'bold'}}>{elem.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{elem.location}</Typography>
                  </CardContent>

                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={classes.reviewContainer}>
          <ReviewsIcon />
          <Typography variant="h6">Reviews</Typography>

            <Grid container justifyContent="flex-start" alignItems="center" >
              <Grid className={classes.reviewCardContainer}>

                  <Card className={classes.reviewCard}>
                    <CardContent className={classes.reviewCardContent}>
                      <Typography variant="body1"><b>Hugo Brasserie</b></Typography>
                      <Rating name="read-only" value={5} readOnly />
                      <Typography variant="body2">We had a gorgeous Sunday Dinner at Hugo’s! Inside the restaurant is beautiful and so comfortable. We were greeted with a smile and had some delicious starters. Nothing was too much to ask for we were so well attended to. The cocktails are delicious! Highly recommend the poison apple for Gin lovers. Callum was such an excellent host and offered exceptional service. Thank you!</Typography>
                    </CardContent>                    
                    </Card>

                    <Card className={classes.reviewCard}>
                    <CardContent>
                      <Typography variant="body1"><b>Chilli Padi</b></Typography>
                      <Rating name="read-only" value={4} readOnly />
                      <Typography variant="body2">We were in Newcastle for four nights and Chilli Padi was so good that we ate here for three of those. It has a very comprehensive menu and the main difficulty is choosing what to eat. The dishes we had on each evening ranged from very good to excellent, and were served without a long wait despite the restaurant being very busy each night. The service is second to none with cheerful, helpful and knowledgeable staff. The restaurant is clean and nicely lit with an attractive decor. If you want to eat here at night it’s wise to book although generally the wait isn’t too long even on a busy night. Highly recommended.</Typography>
                    </CardContent>
                  </Card>

                </Grid>
            </Grid>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;