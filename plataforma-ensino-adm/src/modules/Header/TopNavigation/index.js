import { Drawer, Toolbar, List, Grid, ListItem, useMediaQuery, Menu, MenuList, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router";

const TopNavigation = props => {

    const {
        open,
        items = [],
        ...other
    } = props;
    
    const [activeItems, SetActiveItems] = useState([]);
    const [anchorEl, SetAnchorEl] = useState(null);

    const navigate = useNavigate();

    const HandleLinkClick = link => navigate(link);
    const HandleMenuToggle = (event, items) => {
        if (activeItems?.length != 0) {
            SetActiveItems([]);
            SetAnchorEl(null);
        } else {
            if (!items) return;
            SetActiveItems(items);
            SetAnchorEl(event.currentTarget);
        }
    }

    return (
        <>
            <Drawer
                {...other}
                anchor={"top"}
                open={items.length != 0 ? open : false}
            >
                <Toolbar/>
                <List>
                    <Grid
                        container
                    >
                        {items?.map((item, itemKey) => (
                            <Grid item xs={12} sm={6} key={itemKey}>
                                <ListItem 
                                    button
                                    onClick={e => HandleMenuToggle(e, item?.items)}
                                >
                                    {item.label}
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                </List>
            </Drawer>
            <Menu
                open={activeItems?.length != 0}
                anchorEl={anchorEl}
                onClose={HandleMenuToggle}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                getContentAnchorEl={null}
                PaperProps={{
                    elevation: 20,
                    style: {
                        minWidth: "30vw"
                    }
                }}
            >
                <MenuList>
                    {activeItems?.map((item, itemKey) => (
                        <MenuItem
                            onClick={() => HandleLinkClick(item?.link)}
                            key={itemKey}
                        >
                            {item?.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
}

export default TopNavigation;