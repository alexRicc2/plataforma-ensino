import React, { useCallback, useEffect, useState } from 'react';
import { URL } from '../variables';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';
import Aside from '../SideBar/Aside';

import '../SideBar/styles/App.scss';
import { login, logout, mudarDados } from '../actions/AppActions';
import { Show } from "../actions/SnackbarActions";
import { Navigate, Route, Outlet } from 'react-router';
import Profile from '../pages/Profile';
import RoleBasedStyle from '../components/Role/RoleBasedStyle';


const Home = (props) => {
    const toggled = useSelector(store => store.AppReducer.toggled)
    const collapsed = useSelector(store => store.AppReducer.collapsed)
    // const token = useSelector(store => store.AppReducer.token)
    const token = localStorage.getItem('token');
    const user = useSelector(store => store.AppReducer.user)
    const adminAsUser = useSelector(store => store.AppReducer.adminAsUser);
    
    const snackbar = useSelector(store => store.SnackbarReducer);

    console.log('toke', token)
    const dispatch = useDispatch();
    const [loading_home, setLoadingHome] = useState(true);
    const [image, setImage] = useState(true);
    // const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = (checked) => {
        dispatch(mudarDados({ collapsed: checked }));

    };

    const handleImageChange = (checked) => {
        setImage(checked);
    };

    const handleToggleSidebar = (value) => {
        // setToggled(value);
        // console.log(value);
        dispatch(mudarDados({ toggled: value }));
    };

    const get_user = useCallback(() => {
        
        console.log('token usado', token)
        fetch(`${URL}api/auth/user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(async (responseLog) => {
            try {
                let resp = await responseLog.json();
                console.log(resp);
                if (resp.message == "Unauthenticated.") {
                    console.log('rodou aki')
                    localStorage.removeItem('token'); localStorage.removeItem('user');
                    dispatch(logout());
                    return;
                }
                if (resp.errors != null || resp.error != null) {
                    let errors = Object.values(resp.errors);
                    let erro = '';
                    for (let i = 0; i < errors.length; i++) {
                        if (i != errors.length - 1)
                            erro += errors[i] + '\n';
                        else
                            erro += errors[i];
                    }
                    console.error(erro);
                    setTimeout(() => {
                        get_user();
                    }, 5000);
                }
                else {
                   console.log('works', resp)
                    localStorage.setItem('user', JSON.stringify(resp.user));
                    dispatch(login({ token: token, user: resp.user }));
                    setLoadingHome(false);
                }
            } catch (err) {
                setTimeout(() => {
                    get_user();
                }, 5000);
                console.error(err);
            }

        })
            .catch((err) => {
                setTimeout(() => {
                    get_user();
                }, 5000);
            });
    }, [token])

    useEffect(() => {
        const event = (e) => {
            if (window.innerWidth <= 768) {
                dispatch(mudarDados({ toggled: false, collapsed: false }));

            }
            else {

                dispatch(mudarDados({ toggled: true, collapsed: false }));

            }
        };
        window.addEventListener('resize', event)
        if (window.innerWidth <= 768) {
            dispatch(mudarDados({ toggled: false, collapsed: false }));
        }
        else {
            dispatch(mudarDados({ toggled: true, collapsed: false }));
        }
        get_user();
        
        return () => {
            window.removeEventListener('resize', event);

            // Anything in here is fired on component unmount.
        }
    }, [])

    const HandlePath = (adminComponent, userPath, allowAdminAsUser = false) => {
        if (user.role == "Admin") {
            if (adminAsUser && allowAdminAsUser) return userPath;
            return adminComponent;
        }
        else return userPath;
    }

    const marginLeft = (toggled == false || window.innerWidth <= 768) ? 0 : (collapsed == false ? 270 : 80);

    return (
        <div className={`app ${toggled ? 'toggled' : ''}`}>
            
            
                <Aside
                    image={image}
                    collapsed={collapsed}
                    toggled={toggled}
                    handleToggleSidebar={handleToggleSidebar}
                    handleCollapsedChange={handleCollapsedChange}
                />
            
            
                <Header
                    // image={image}
                    toggled={toggled}
                    collapsed={collapsed}
                    handleToggleSidebar={handleToggleSidebar}
                    handleCollapsedChange={handleCollapsedChange}
                    handleImageChange={handleImageChange}
                />
            
            
                
            
            <br/>
            <div className="content-page">
            <RoleBasedStyle
                    className="content"
                    defaultStyle={{
                        transition: 'all 0.3s ', paddingBottom: 100, background: '#f8f8fa'
                    }}
                    hasRoleStyle={{
                        marginLeft: marginLeft
                    }}
                    roles={["Admin", "Professor", "Aluno"]}
                >
                    {loading_home == false && <div className="container-fluid">
                     <Outlet/>
                       
                    </div>}
            </RoleBasedStyle>
                    {/* {loading_home == true &&
                        <div className="row"> <div className="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: '2rem' }}>
                            <div className="spinner-border text-primary" role="status"  >
                            </div>
                        </div></div>
                    } */}
                
                {/* <Footer/> */}
            </div>
        </div>
    );
}

export default Home;