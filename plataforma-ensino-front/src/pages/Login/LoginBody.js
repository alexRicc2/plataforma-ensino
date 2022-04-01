import React, { useEffect, useState } from "react";

import { Checkbox, TextField, Button, Typography, Box, useTheme } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import DefaultButton from "../../components/DefaultButton";

import { Alert } from "@material-ui/lab";

import "./LoginBody.css";
import { PAGE_KEYS } from "../../variables";
import { useSelector } from "react-redux";
import InputText from "../../components/Inputs/InputText";

const LoginBody = props => {

    const {
        onSubmit,
        errors = [],
        link = null,
        loading = false,
        ...other
    } = props;

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [remember, SetRemember] = useState(false);

    const [showEmailError, SetShowEmailError] = useState(false);
    const [showPasswordError, SetShowPasswordError] = useState(false);
    
    const location = useLocation();
    const theme = useTheme();

    // const pageStyle = useSelector(store => store.AppReducer.pagesStyles[PAGE_KEYS.login]);

    const HandleSubmitButton = e => {
        SetShowEmailError(!email);
        SetShowPasswordError(!password);
        if (!password || !email) {
            e.preventDefault();
            return;
        }

        let data = {
            email: email,
            password: password,
            remember: remember
        }

        onSubmit(data);
    }

    useEffect(() => location?.state && location?.state?.email && SetEmail(location.state.email), []);

    return (
        <Box
            className="login-body"
            // bgcolor={"secondary.main"}
        >
            <div className="login-content">
                <h1 className="text-white">Entrar</h1>
                <form
                    className="login-main-form"
                >
                    <TextField
                        variant="filled"
                        label="E-mail"
                        value={email}
                        onChange={e => SetEmail(e.target.value)}
                        error={showEmailError}
                        helperText={showEmailError ? "Insira um e-mail!" : ""}
                        className="w100"
                        style={{
                            backgroundColor: "white"
                        }}
                    />
                    <TextField
                        variant="filled"
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={e => SetPassword(e.target.value)}
                        error={showPasswordError}
                        helperText={showPasswordError ? "Insira uma senha!" : ""}
                        className="w100"
                        style={{
                            backgroundColor: "white"
                        }}
                    />
                    <Button
                        onClick={HandleSubmitButton}
                        disabled={loading}
                        // color="primary"
                        variant="contained"
                        className={"w100"}
                        style={{
                            backgroundColor: theme?.login?.primary?.main
                        }}
                    >
                        Entrar
                    </Button>
                    <div className="w100 flex jcsb align-center">
                        <div className="flex fdrow align-center text-muted">
                            <Checkbox
                                className="text-muted"
                                value={remember}
                                onChange={e => SetRemember(e.target.checked)}
                            />
                            Lembre-se de mim
                        </div>
                        <a href="#" className="text-muted">Precisa de ajuda?</a>
                    </div>
                    <span className="text-muted">
                        Novo aqui? <Typography component="span" color="primary"><Link 
                            className="text-primary" 
                            to={{
                                pathname: "/register",
                                state: {
                                    email: email,
                                    ...location?.state
                                }
                            }}
                        > 
                            Cadastre-se agora!
                        </Link></Typography>
                    </span>
                </form>
                <Alert severity="error" hidden={errors.length == 0}>
                    {errors[0]}
                    {link}
                </Alert>
            </div>
        </Box>
    );
}

export default LoginBody;