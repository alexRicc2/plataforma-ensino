import React, { useState } from "react";

import { Tabs, Tab } from "@material-ui/core";
import { useNavigate } from "react-router";
import TabPanel from "../../../components/TabPanel";
import CourseUsers from "./CourseUsers";
import CourseLesson from "./CourseLessons";
import ModuleList from "./Modules/List";

const TabsContainer = () => {

    const [activeTab, SetActiveTab] = useState(0);

    const navigate = useNavigate();

    return (
        <div className="tabs">
            <Tabs
                value={activeTab}
                onChange={(_, value) => {
                    SetActiveTab(value);
                    navigate({search: `?tab=${value}`});
                }}
                style={{ backgroundColor: "#ececf1" }}
                indicatorColor="primary"
                textColor="primary"
                variant={"scrollable"}
                scrollButtons={"on"}
            >
                <Tab label="Módulos"/>
                <Tab label="Alunos"/>
                <Tab label="Dados"/>
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                {/* <CourseLesson/> */}
                <ModuleList/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <CourseUsers/>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                dados :o
            </TabPanel>
        </div>
    );
}

export default TabsContainer;