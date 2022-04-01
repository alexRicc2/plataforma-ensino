
import React, { Component, useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { logout } from './actions/AppActions';
import { connect, useDispatch, useSelector } from 'react-redux';

// users
import { FaUserAlt } from 'react-icons/fa';
import { URL } from './variables';
import { Avatar, Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';


const ProfileMenu = (props) => {
    const dispatch = useDispatch();

    const [menu, setMenu] = useState(false);
    const [anchorEl, SetAnchorEl] = useState(null);

    const user = useSelector(store => store.AppReducer.user);

    const navigate = useNavigate();

    const toggle = useCallback(() => setMenu(!menu), [menu]);

    const HandleClick = e => {
        setMenu(true);
        SetAnchorEl(e.target);
    }

    const HandleClose = () => {
        setMenu(false);
        SetAnchorEl(null);
    }

    const logout_ = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout());
    }, []);

    // return (
    //     // <React.Fragment>
    //     //     <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block" >
    //     //         <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
    //     //             <img className="rounded-circle header-profile-user" src={user.imagem==null? user4:URL+user.imagem} height="50" width={'50'} alt="Header Avatar" style={{objectFit:'cover'}} />
    //     //         </DropdownToggle>
    //     //         <DropdownMenu right>
    //     //             <DropdownItem onClick={() => navigate.push(`/profile/view/${user?.id}`)} style={{cursor:'pointer',alignItems:'center',display:"flex"}}><FaUserAlt style={{marginRight:5}}/> Perfil</DropdownItem>
    //     //             <DropdownItem tag="a" onClick={logout_} style={{cursor:'pointer',alignItems:'center',display:"flex"}}><MdLogout, MdLogin style={{marginRight:5}}/> Sair</DropdownItem>
    //     //         </DropdownMenu>
    //     //     </Dropdown>
    //     // </React.Fragment>
    // );
    return (
        <>
            <Tooltip
                title="Plataforma front"
                arrow
            >
                <IconButton
                    size="small"
                    onClick={HandleClick}
                >
                    <Avatar>
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                open={menu}
                anchorEl={anchorEl}
                onClose={HandleClose}
                onClick={HandleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                getContentAnchorEl={null}
                style={{
                    zIndex: 2000
                }}
                PaperProps={{
                    style: {
                        minWidth: "10em"
                    }
                }}
            >
                {(user && Object.keys(user)?.length != 0) ? (<div>
                <MenuItem onClick={() => navigate(`/profile/view/${user?.id}`)}><Avatar style={{ width: 32, height: 32 }}/> Perfil</MenuItem>
                <Divider/>
                <MenuItem onClick={logout_}>Sair</MenuItem>
                </div>) :
                (<div>
                    <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                    <Divider/>
                    <MenuItem onClick={() => navigate("/register")}>Criar conta</MenuItem>
                </div>)}
            </Menu>
        </>
    )
}

export default ProfileMenu;


