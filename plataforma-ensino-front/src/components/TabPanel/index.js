import React from "react";
import { Box, Typography } from "@material-ui/core";

const TabPanel = (props) => {

    const { children, value, index, ...other } = props;
    
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
                <Box
                    p={3}
                    // hidden={value != index}
                >
                    <Typography component={"span"}>{children}</Typography>
                </Box>
        </div>
    );
}

export default TabPanel;