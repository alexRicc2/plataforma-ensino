import logo from './assets/images/logo.png';
import "./index.css";
import RoutesContainer from './routes';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, createTheme, CssBaseline, LinearProgress, Typography, Zoom } from '@material-ui/core';
function App() {

  const [loading, SetLoading] = useState(true);

  const dispatch = useDispatch();

  const HandleUserSession = () => {
    SetLoading(true);
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    
    if (user === null || user === undefined || user == "undefined" || user == "null") {
        user = {};
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } else user = JSON.parse(user);
    
    dispatch({
        type: "login",
        payload: {
            token: token,
            user: user
        }
    });
    SetLoading(false)
}
useEffect(HandleUserSession, []);

if (loading) return (
      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
      >
          <img
              src={logo}
              width="100"
              height="100"
          />
          <LinearProgress
              color="secondary"
              style={{
                  width: "100px"
              }}
          />
          <br/>
          <Typography>
              Carregando informações
          </Typography>
      </Box>
);

  return (
   <RoutesContainer/>
  );
}

export default App;
