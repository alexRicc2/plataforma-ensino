import { AppBar, Box, Toolbar, Typography, Button, Menu, Drawer, List, ListItem, Grid, IconButton, useMediaQuery, ButtonBase } from "@material-ui/core";
import SearchInput from "../../components/Inputs/SearchInput";
import ProfileMenu from "../../ProfileMenu";
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import { useEffect, useState } from "react";
import TopNavigation from "./TopNavigation";

import styles from "./index.module.css";
import logo from "../../assets/images/logo.png";
import LeftNavigation from "./LeftNavigation";
import { useNavigate } from "react-router";

const Header = props => {

    const {
        pages
    } = props;

    const [expanded, SetExpanded] = useState(false);
    const [activeItems, SetActiveItems] = useState([]);

    const matchesXs = useMediaQuery("(max-width: 960px)");

    const navigate = useNavigate();

    const HandleDropdownToggle = () => {
        SetExpanded(!expanded);
        if (activeItems.length != 0) SetActiveItems([]);
    }
    
    const HandleDropdownClose = () => {
        SetExpanded(false);
        SetActiveItems([]);
    }

    const HandleItemClick = page => {
        //if the page has a link, send the user to it, instead of opening the menu
        if (page?.link) {
            navigate(page?.link);
            return;
        }
        const items = page?.items || [];
        HandleDropdownToggle();
        SetActiveItems([...items]);
    }

    return (
        <Box
            style={{
                display: "flex",
               
            }}
        >
            <AppBar
                position="fixed"
                style={{
                    zIndex: 1500,
                    
                }}
            >
                <Toolbar>
                    <Box
                        display={{ xs: "block", md: "none" }}
                        style={{
                            marginRight: 5
                        }}
                    >
                        <IconButton onClick={HandleDropdownToggle}>
                            <MenuIcon htmlColor="white"/>
                        </IconButton>
                    </Box>
                    <div
                        style={{
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundImage: `url(${logo})`,
                            width: "2em",
                            height: "2em"
                        }}
                        onClick={() => navigate("/")}
                    />
                    
                    <Box
                        display={{ xs: 'none', md: 'flex' }}
                        margin={"0 1em"}
                        style={{
                            flexGrow: 1
                        }}
                    >
                        {pages?.map((page, pageKey) => (
                            <Button
                                style={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => HandleItemClick(page)}
                                key={pageKey}
                            >
                                <b>{page?.label}</b>
                            </Button>
                        ))}
                        
                    </Box>
                    <div className={styles.rightContainer}>
                        <Button
                            style={{ color: 'white', display: 'block' }}
                            // variant="outlined"
                        >
                            Administração
                        </Button>
                        <Box>
                            <ProfileMenu/>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>
            {matchesXs ? 
            (<LeftNavigation
                open={expanded}
                pages={pages}
                onClose={HandleDropdownClose}
                disableScrollLock
            />)
            :
            (<TopNavigation
                open={activeItems?.length != 0}
                items={activeItems}
                onClose={HandleDropdownClose}
                disableScrollLock
            />)}
            <Toolbar/>
        </Box>
    );
}
export default Header;