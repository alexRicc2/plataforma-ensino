import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "../TabPanel";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { StyledEngineProvider } from '@mui/material/styles';
import "./tabs.css";

import styles from "./index.module.css";

const TabsContainer = props => {

    const {
        children,
        labels,
        tabName = "t",
        variant = "standard",
        ...other
    } = props;

    const [tab, SetTab] = useState(0);
    
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location?.search)

    useEffect(() => SetTab(parseInt(urlSearchParams.get(tabName) || 0)), []);

    return (
        <StyledEngineProvider injectFirst>
        <div className="tabsContainer" {...other}>
            <Tabs
                value={tab}
                onChange={(_, value) => {
                    SetTab(value);
                    navigate({ search: `?${tabName}=${value}` });
                }}
                textColor="secondary"
                variant={variant}
            >
                {React.Children?.map(children, (_, key) => (
                    <Tab
                        className={styles.tab}
                        {...labels[key]}
                        key={key}
                        sx={{ color: "#f7f7f7" }}

                    />
                ))}
            </Tabs>
            <div className="tabPanelGroup">
                <SwipeableViews
                    index={tab}
                >
                    {React.Children?.map(children, (child, key) => (
                        <TabPanel
                            value={tab}
                            index={key}
                            key={key}
                        >
                            {child}
                        </TabPanel>
                    ))}
                </SwipeableViews>
            </div>
        </div>
        </StyledEngineProvider>
    );
}

export default TabsContainer;