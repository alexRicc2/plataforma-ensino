import { IconButton, Menu, MenuItem, MenuList } from "@material-ui/core";
import { forwardRef, useState } from "react";

import SettingsIcon from '@material-ui/icons/Settings';
import PlaybackSpeed from "./PlaybackSpeed";

const SettingsMenu = forwardRef((props, ref) => {

    const [anchor, SetAnchor] = useState(false);

    const HandleMenuOpen = e => SetAnchor(e.currentTarget);
    const HandleMenuClose = () => SetAnchor(null);

    return (
        <>
            <IconButton
                onClick={HandleMenuOpen}
            >
                <SettingsIcon htmlColor="white"/>
            </IconButton>
            <Menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                onClose={HandleMenuClose}
                open={Boolean(anchor)}
                anchorEl={anchor}
                getContentAnchorEl={null}
                disableAutoFocus
                disablePortal
                keepMounted
            >
                <MenuList>
                    <PlaybackSpeed
                        onChange={speed => {
                            if (ref?.current) ref.current.playbackRate = speed;
                        }}
                    />
                </MenuList>
            </Menu>
        </>
    );
});

export default SettingsMenu;