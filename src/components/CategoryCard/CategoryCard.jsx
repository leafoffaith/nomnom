/*
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>

    @description:
        This React component displays a list of categories or cuisines (from a JSON file under the data folder).
        Each category is displayed as a card with an image and title. Users can select a category by clicking on it, 
        which will then highlight the selected card and trigger a callback function with the name of the selected
        category.
*/

//Import necessary libraries and components
import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardMedia} from "@mui/material";
import Grid from "@mui/material/Grid";
import data from "../../data/categories.json"
import useStyles from './styles'
  

const Categories = ({onClick}) => {

    const classes = useStyles();

    //State for storing the selected cuisine
    const [selectedCuisine, setSelectedCuisine] = useState(null);

    //Function to handle when a cuisine is clicked
    let clickCuisine = (cuisine) => {
        setSelectedCuisine(cuisine);
        onClick(cuisine.toLocaleLowerCase());
    }

    return (
        <div className={classes.categoryCardContainer}>
            <div className={classes.cardContainer}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                    wrap="nowrap"
                >
                    {/* Map through each category and create a card for it */}                    
                    {data.map((elem) => (
                        <Grid
                            item xs={3}
                            className={classes.card}>
                                <Card 
                                    className={`${classes.categoryCard} ${elem.cuisine === selectedCuisine ? classes.selectedCard : ""}`} 
                                    onClick={e => clickCuisine(elem.cuisine)}
                                >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        component="img"
                                        image={elem.icon}
                                    />
                                    <CardContent 
                                        className={classes.cardContent}>
                                        {elem.cuisine}
                                    </CardContent>
                                </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Categories;
