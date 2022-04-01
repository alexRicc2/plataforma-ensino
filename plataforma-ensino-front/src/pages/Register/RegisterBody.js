import React, { useState, useEffect } from "react";
import { Checkbox, TextField, Button, useTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useLocation } from "react-router";
import DefaultButton from "../../components/DefaultButton";

import "./RegisterBody.css";
import { Link } from "react-router-dom";
import PhoneInput from "../../components/Inputs/PhoneInput";
import { useSelector } from "react-redux";
import { PAGE_KEYS } from "../../variables";

import InputText from "../../components/Inputs/InputText";

const RegisterBody = props => {

    const {
        onSubmit,
        errors = [],
        loading = false,
        ...other
    } = props;

    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, SetPhone] = useState("");
    const [password, SetPassword] = useState("");
    const [remember, SetRemember] = useState(false);

    const [showNameError, SetShowNameError] = useState(false);
    const [showEmailError, SetShowEmailError] = useState(false);
    const [showPasswordError, SetShowPasswordError] = useState(false);

    const location = useLocation();
    // const pageStyle = useSelector(store => store.AppReducer.pagesStyles[PAGE_KEYS.register]);
    const theme = useTheme();

    const HandleSubmitButton = async e => {
        SetShowNameError(!name);
        SetShowEmailError(!email);
        SetShowPasswordError(!password);
        if (!password || !email || !name) {
            e.preventDefault();
            return;
        }

        let data = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            remember: remember
        }

        onSubmit(data);
    }

    useEffect(() => {
        if (location?.state) {
            location?.state?.email && SetEmail(location.state.email);
            location?.state?.name && SetName(location.state.name);
        }
    }, []);

    return (
        <div 
            className="register-body"
        >
            <div className="register-content">
                <h1 className="text-white">Cadastro</h1>
                <form
                    className="register-main-form"
                >
                    <TextField
                        variant="filled"
                        label="Seu nome"
                        value={name}
                        onChange={e => SetName(e.target.value)}
                        error={showNameError}
                        helperText={showNameError ? "Insira um nome!" : ""}
                        className={"w100"}
                        style={{
                            backgroundColor: "white"
                        }}
                    />
                    <TextField
                        variant="filled"
                        label="E-mail"
                        value={email}
                        onChange={e => SetEmail(e.target.value)}
                        error={showEmailError}
                        helperText={showEmailError ? "Insira um e-mail!" : ""}
                        className={"w100"}
                        style={{
                            backgroundColor: "white"
                        }}
                    />
                    <PhoneInput
                        GetValue={value => SetPhone(value)}
                        variant="filled"
                        label="Telefone"
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
                        variant="contained"
                        className="w100"
                        color="primary"
                    >
                        Cadastrar
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
                    <p className="text-muted">
                        Já possuí conta? 
                        <Link 
                            className="text-primary" 
                            to={{
                                pathname: "/login",
                                state: {
                                    email: email,
                                    ...location?.state
                                }
                            }}> Entre agora!</Link>
                    </p>
                </form>
                <Alert severity="error" hidden={errors.length == 0}>
                    {errors[0]}
                </Alert>
            </div>
        </div>
    );
}

export default RegisterBody;