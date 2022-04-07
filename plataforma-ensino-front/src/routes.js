import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, Router } from "react-router-dom";


import Home from "./Home/Home";
// import Login from "./Auth/Login";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { useSelector, useDispatch } from 'react-redux'
import Profile from "./pages/Profile";
import ListagemCursos from "./pages/ListagemCursos";
import HomeCourse from "./pages/HomeCourse";

const RoutesContainer = () => {

    const token = useSelector(state => state.AppReducer.token);
    
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={
                    token != null ? (<Home/>) : (
                        <Navigate to={{ pathname: '/landing' }} />
                    )
                }>
                    <Route path={`/home/curso/:course_id`} element={<HomeCourse/>}/>
                    <Route path={`/`} element={<ListagemCursos/>}/>
                    <Route path={`profile/view/:user_id`} element={<Profile/>}/>
                </Route>

                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/landing" element={<LandingPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesContainer;