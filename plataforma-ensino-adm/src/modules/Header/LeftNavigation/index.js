import { Drawer, Toolbar, List, ListItem, Grid, ButtonBase, Typography, MenuList, MenuItem, Menu } from "@material-ui/core";
import CollapseContainer from "../../../components/CollapseContainer";
import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./index.module.css";

const LeftNavigation = props => {
    const {
        pages = [],
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
                anchor={"left"}
                PaperProps={{
                    style: {
                        width: "60%"
                    }
                }}
            >
                <Toolbar/>
                <List>
                    {pages?.map((page, pageKey) => page?.link ? 
                    (<ButtonBase
                        onClick={() => HandleLinkClick(page?.link)}
                        className={styles.linkButton}
                        key={pageKey}
                    >
                        <span>{page?.label}</span>
                    </ButtonBase>) : 
                    (<CollapseContainer
                            key={pageKey}
                            title={page?.label}
                            hideExpandLabel
                        >
                            {page?.items?.map((item, itemKey) => (
                                <ListItem
                                    button
                                    key={itemKey}
                                    onClick={e => {
                                        HandleLinkClick(item?.link);
                                        HandleMenuToggle(e, item?.items)
                                    }}
                                >
                                    {item?.label}
                                </ListItem>
                            ))}
                            <ListItem>
                                <Typography hidden={page?.items?.length > 0}>
                                    Sem itens!
                                </Typography>
                            </ListItem>
                        </CollapseContainer>
                    ))}
                </List>
            </Drawer>
            <Menu
                open={activeItems?.length != 0}
                anchorEl={anchorEl}
                onClose={HandleMenuToggle}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left'
                }}
                getContentAnchorEl={null}
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

export default LeftNavigation;