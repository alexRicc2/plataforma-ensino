import React from 'react';
import ProfileMenu from './ProfileMenu';

import { connect } from 'react-redux';

import { FaBars } from 'react-icons/fa';


const Header = props => {

    const {
        handleToggleSidebar,
        handleImageChange,
        handleCollapsedChange = () => {},
        toggled,
        collapsed,
        ...other
    } = props;

    const marginLeft = (toggled == false || window.innerWidth <= 768) ? 0 : (collapsed == false ? 270 : 80);

    return (
        <>
            <div className="topbar" {...other}>
                <nav className="navbar-custom d-flex justify-content-between align-items-center" style={{marginLeft: marginLeft,transition: 'all 0.3s '}}>
                <div 
                    className="btn-toggle" 
                    style={{
                        background: '#ececf1', 
                        color: '#353535'
                    }} 
                    onClick={() => {
                        if (window.innerWidth <= 768) {
                            handleToggleSidebar(!toggled);
                        } else {
                            handleCollapsedChange(!collapsed);
                        }
                    }}>
                        <FaBars/>
                    </div>
                    <ul className="navbar-right d-flex list-inline float-right mb-0">
                        <ProfileMenu/>
                    </ul>
                </nav>
            </div>
            <nav className="navbar-custom"/>
        </>
    );

}


export default Header;