import React from 'react';
import ProfileMenu from './ProfileMenu';
import { URL } from './variables';
import Logo from './assets/images/logo2.png';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem,FaHeart } from 'react-icons/fa';


const Sidebar = (props) => {




    return (
        <ProSidebar>
            <SidebarHeader>
                {/**
           *  You can add a header for the sidebar ex: logo
           */}
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FaHeart />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                {/**
           *  You can add a footer for the sidebar ex: copyright
           */}
            </SidebarFooter>
        </ProSidebar>

    );

}


export default Sidebar;