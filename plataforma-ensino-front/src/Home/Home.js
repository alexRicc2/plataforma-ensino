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
    const [courses, SetCourses] = useState([]);
    const [loading, SetLoading] = useState(false);

    const [page, SetPage] = useState(1);
    const [maxPage, SetMaxPage] = useState(1);


    const GetData = async () => {
        SetLoading(true);
        let response = await Get(`courses-main?search=${search}&page=${page}`);
        SetLoading(false);

        if (response?.status === true) {
            SetCourses(response?.courses);
            SetMaxPage(response?.pagination.last_page);
        } else if (!response) dispatch(Show({
            show: true,
            message: "Falha ao carregar os cursos",
            severity: "warning"
        }));
        console.log(response.courses);
    }

    useEffect(() => {
        GetData();
    }, [search, page]);


    const HandlePath = (adminComponent, userPath, allowAdminAsUser = false) => {
        if (user.role == "Admin") {
            if (adminAsUser && allowAdminAsUser) return userPath;
            return adminComponent;
        }
        else return userPath;
    }

    const marginLeft = (toggled == false || window.innerWidth <= 768) ? 0 : (collapsed == false ? 270 : 80);

    return (
        <Box
            display={"flex"}
            flexDirection="column"
        >
            <Header/>
            <main style={{ minHeight: '80vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: "20px", backgroundColor: "lightblue"}}>
                <h2>Usuário logado no front</h2>
                <br/>
                <h3>Cursos listados aki</h3>  
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                {courses.map((curso, index) => (
                    <Card
                    key={index}
                    sx={{ width: "30%", margin: "1.5%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={STORAGE_URL + curso.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {curso.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {curso.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}        
                </div>
                <Outlet/>
                      
            </main>
              
           
        </Box>
    );
}

export default Home;