import React, { useEffect, useState } from "react";
import "./index.css";

import { Box, TextField } from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";

import Header from "../../modules/Header";

import { useMainPages } from "../../modules/Header/data";

const LandingPage = props => {

    
    const pages = useMainPages();
    const navigate = useNavigate();
    return (
        <Box
            display={"flex"}
            flexDirection="column"
        >
            <Header pages={pages}/>
            <main style={{ minHeight: '80vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2> Landingpage do adm</h2>
                <br/>
                <a onClick={()=> navigate('/register')}>Cadastre-se</a>
                
                <a onClick={()=> navigate('/login')}>Logar</a>
            </main>
            <Footer/>
        </Box>
    );
}


export default LandingPage;