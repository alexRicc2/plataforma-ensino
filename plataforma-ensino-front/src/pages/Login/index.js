import React, { useEffect, useMemo, useState } from "react";

import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";

import { Post } from "../../utils/request";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_KEYS, STORAGE_URL } from "../../variables";
import { ThemeProvider } from '@material-ui/styles';
import Footer from "../../Home/Footer";
import Header from "../../modules/Header";

import "./index.css";
import { mainPages } from "../../modules/Header/data";
import { Box, useTheme, createTheme } from "@material-ui/core";

const Login = () => {

    const [loading, SetLoading] = useState(false);

    const [errorsList, SetErrors] = useState([]);
    const [link, SetLink] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const location = useLocation();
    const theme = useTheme();

    

    const innerTheme = useMemo(() => createTheme({
        palette: theme?.login
    }), [theme?.login]);

    const Login = async (email, password) => {
        let form = new FormData();
        
        form.append("email", email);
        form.append("password", password);

        SetLoading(true);
        let response = await Post("auth/login", form);

        if (response?.status) {
            let token = response["access_token"];
            let user = response["user"];

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            dispatch({type: "login", payload: {token: token, user: user}});
        } else if (response["errors"]) {
            let errors = Object.values(response["errors"]);
            SetErrors(errors);
            
            if (response["link"]) SetLink(<Link to={response["link"]["href"]}>{response["link"]["message"]}</Link>)
            else SetLink(null);

            SetLoading(false);

            return;
        }

        navigate(location?.state?.redirectTo ? location?.state?.redirectTo : "/");
        window.location.reload()
    }

    
    return (
        <Box
            className="login-wrapper"
            bgcolor={"#212121"}
            style={theme?.login?.background}
            // style={{
                //     ...(pageStyle && pageStyle["background_color"] && {backgroundColor: pageStyle["background_color"]}),
            //     ...(pageStyle && pageStyle["background_image"] && {backgroundImage: `url(${STORAGE_URL + pageStyle["background_image"]})`})
            // }}
        >
            <Header pages={mainPages}/>
            <ThemeProvider theme={innerTheme}>
                <LoginBody
                    onSubmit={data => {
                        if (data === null || data === undefined) return;
                        let email = data.email;
                        let password = data.password;
                        Login(email, password);
                    }}
                    errors={errorsList}
                    link={link}
                    loading={loading}
                />
            </ThemeProvider>
            <Footer/>
        </Box>
    );
}

const Skeleton = () => {
    return (
        <div>
            <div style={{height: "100px", padding: "5px"}}>
                <div className="skeleton-base skeleton-shimmer" style={{width: "8em", height: "3.25em"}}></div>
            </div>
            <div className="skeleton-base skeleton-shimmer" style={{
                width: "28em",
                height: "30em",
                margin: "auto"
            }}/>
        </div>
    );
}

export default Login;