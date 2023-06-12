/*
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>  

    @description: 
        This component represents a hamburger navigation mednu which can be toggled open or closed. When opened,
        it displays a list of navigation options: Home, Login and Sign Up. Each option is represented with an 
        icon and text, and clicked on an option will navigate to the respective route

    @reference:
        Code referenced from
        https://www.youtube.com/watch?v=GVjIflROwJ4&t=608s 

*/

//import relevant libraries and components
import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {Fragment} from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import useStyles from './styles'


const Menu = () => {

    const classes = useStyles();

    const [openMenu, setOpenMenu] = useState(false);

    const menuOptions = [
      {
        text: "Home",
        icon: <HomeIcon />,
        link: "/",
      },
      {
        text: "Login",
        icon: <LoginIcon />,
        link: "/log-in",
      },
      {
        text: "Sign Up",
        icon: <PersonAddIcon />,
        link: "/log-in",
      },
    ];

    return (
        <Fragment>

            {/* Menu icon which toggles the menu open state when clicked        */}
            <div className={classes.navbarMenuContainer}>
                <MenuIcon onClick={() => setOpenMenu(true)} />
            </div>

            {/* Drawer from Material UI that contains the navigation menu */}
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="left">
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <Link to={item.link} className={classes.menuItemLinks}>
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </Fragment>
    );
};
  
export default Menu;
  