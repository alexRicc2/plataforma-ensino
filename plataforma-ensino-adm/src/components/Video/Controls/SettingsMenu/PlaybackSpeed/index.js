import { Menu, MenuItem, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

const PlaybackSpeed = props => {

    const {
        onChange = () => {}
    } = props;

    const [anchor, SetAnchor] = useState(null);
    const [speed, SetSpeed] = useState(1);

    const theme = useTheme();

    const HandleMenuOpen = e => SetAnchor(e.currentTarget);
    const HandleMenuClose = () => SetAnchor(null);

    useEffect(() => onChange(speed), [speed]);

    return (
        <>
            <MenuItem
                onClick={HandleMenuOpen}
                style={{
                    fontSize: "1em"
                }}
                dense
            >
                Velocidade de reprodução {speed == 1 ? "Normal" : speed}
            </MenuItem>
            <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                getContentAnchorEl={null}
                onClose={HandleMenuClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                disablePortal
            >
                {SPEEDS?.map((speedLabel, key) => (
                    <MenuItem
                        key={key}
                        onClick={() => {
                            HandleMenuClose();
                            SetSpeed(speedLabel);
                        }}
                        style={{
                            backgroundColor: speed == speedLabel ? theme.palette.primary.main : "inherit"
                        }}
                    >
                        {speedLabel == 1 ? "Normal" : speedLabel}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default PlaybackSpeed;