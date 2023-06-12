/* 
    @author: Claudia McMaster <c.mcmaster2@ncl.ac.uk>

    @description:
        This header components serves as the navigation bar for the application. It consists of multiple sections
        including a menu, logo, navigation links and an account icon which is linked to the login/user account page.
        The 'useStyles' hook from Material-UI is used to apply styles to the component.
*/

//import necessary libraries and components
import React from "react";
import {Link} from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from "./Menu";
import Logo from "../../assets/Logo (orange).svg";

import useStyles from './styles'


const Header = () => {

    const classes = useStyles();

    return (
        <nav className={classes.nav}>
            <Menu />
            <Link to='/'>
                <div className={classes.navLogoContainer}>
                    <img src={Logo} alt="" />
                </div>
            </Link>
           
            <div className={classes.navbarLinksContainer}>
                <a href="/">Home</a>
                <a href="/log-in">Login</a>
                <a href="/log-in">Sign Up</a>

            </div>

            <Link to="/log-in">
                <div className={classes.navAccountIconContainer}> 
                    <AccountCircleIcon size='large'/>
                </div>
            </Link>
        </nav>
    );
};
  
export default Header;
  