import React, { useMemo, useState } from "react";
import RegisterBody from "./RegisterBody";
import RegisterHeader from "./RegisterHeader";

import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../utils/request";
import { useNavigate, useLocation } from "react-router";
import { PAGE_KEYS, STORAGE_URL } from "../../variables";
import Footer from "../../Home/Footer";
import Header from "../../modules/Header";

import "./index.css";
import { mainPages } from "../../modules/Header/data";
import { createTheme, useTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';

const Register = () => {

    const [loading, SetLoading] = useState(false);
    const [errorsList, SetErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const pageStyle = useSelector(store => store.AppReducer.pagesStyles[PAGE_KEYS.register]);
    const theme = useTheme();

  

    const Register = async (name, email, phone, password) => {
        let form = new FormData();
        form.append("name", name);
        form.append("email", email);
        form.append("phone", phone);
        form.append("password", password);

        SetLoading(true);
        let response = await Post("auth/register", form);

        if (response["success"]) Login(email, password);
        else if (response["errors"]) {
            let errors = Object.values(response["errors"]);
            SetErrors(errors);
            SetLoading(false);
            return;
        }
    }

    const Login = async (email, password) => {
        let form = new FormData();
        form.append("email", email);
        form.append("password", password);

        SetLoading(true);
        let response = await Post("auth/login", form);

        if (response["status"]) {
            let token = response["access_token"];
            let user = response["user"];

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            dispatch({type: "login", payload: {token: token, user: user}});
        } else if (response["errors"]) {
            let errors = Object.values(response["errors"]);
            SetErrors(errors);
            SetLoading(false);
            return;
        }
        navigate(location?.state?.redirectTo ? location?.state?.redirectTo : "/");
    }


    return (
        <div
            className="register-wrapper"
            bgcolor={"red"}
            style={{backgroundColor: 'lightblue'}}
        >
 
                <Header pages={mainPages}/>
                <RegisterBody
                    onSubmit={data => {
                        if (data === null || data === undefined) return;
                        let name = data.name;
                        let email = data.email;
                        let phone = data.phone;
                        let password = data.password;
                        Register(name, email, phone,password);
                    }}
                    errors={errorsList}
                    loading={loading}
                />
            <Footer/>
        </div>
    );
}


export default Register;