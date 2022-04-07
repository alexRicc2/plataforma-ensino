import React, { useCallback, useEffect, useState } from 'react';
import { URL } from '../variables';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../modules/Header';
import {Box} from '@material-ui/core'
import '../SideBar/styles/App.scss';
import { login, logout, mudarDados } from '../actions/AppActions';
import { Show } from "../actions/SnackbarActions";
import {Get} from '../utils/request';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material'
import { STORAGE_URL } from '../variables';
import { Outlet } from 'react-router-dom';

const Home = (props) => {
    const toggled = useSelector(store => store.AppReducer.toggled)
    const collapsed = useSelector(store => store.AppReducer.collapsed)
    const token = useSelector(store => store.AppReducer.token)
    //const token = localStorage.getItem('token');
    const user = useSelector(store => store.AppReducer.user)
    const adminAsUser = useSelector(store => store.AppReducer.adminAsUser);
    
    const snackbar = useSelector(store => store.SnackbarReducer);

    console.log('toke', token)
    const dispatch = useDispatch();
    const [loading_home, setLoadingHome] = useState(true);
    const search="";
    // const [toggled, setToggled] = useState(false);

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
   
    return (
        <Box
            display={"flex"}
            flexDirection="column"
        >
            <Header/>
            <Outlet/>
              
           
        </Box>
    );
}

export default Home;