import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, Router } from "react-router-dom";


import Home from "./Home/Home";
// import Login from "./Auth/Login";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { useSelector, useDispatch } from 'react-redux'
import Profile from "./pages/Profile";
import CourseList from "./pages/Courses/CourseList";
import CourseAdd from "./pages/Courses/CourseAdd";
import CourseEdit from "./pages/Courses/CourseEdit";
import CoursePage from "./pages/Courses/CoursePage";
import CategoryList from "./pages/Courses/Category/List";
import CategoryAdd from "./pages/Courses/Category/Add";
import CategoryEdit from "./pages/Courses/Category/Edit";
import TagList from "./pages/Courses/Tags/List";
import TagAdd from "./pages/Courses/Tags/Add";
import TagEdit from "./pages/Courses/Tags/Edit";
import ModuleAdd from "./pages/Courses/CoursePage/Modules/Add";
import ModuleEdit from "./pages/Courses/CoursePage/Modules/Edit";
import ModuleView from "./pages/Courses/CoursePage/Modules/View";
import LessonAdd from "./pages/Courses/CoursePage/CourseLessons/LessonAdd";
import LessonEdit from "./pages/Courses/CoursePage/CourseLessons/LessonEdit";
import LessonView from "./pages/Courses/CoursePage/CourseLessons/LessonView";
import Dashboard from "./pages/Dashboard";

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
                    <Route path={`/`} element={<Dashboard/>}/>
                    <Route path={`profile/view/:user_id`} element={<Profile/>}/>
                    <Route path={`cursos/lista`} element={<CourseList/>}/>
                    <Route path={`cursos/adiciona`} element={<CourseAdd/>}/>
                    <Route path={`cursos/editar/:id`} element={<CourseEdit/>}/>
                    <Route path={`cursos/ver/:id`} element={<CoursePage/>}/>
                    <Route path={`categorias`} element={<CategoryList/>}/>
                    <Route path={`categorias/adiciona`} element={<CategoryAdd/>}/>
                    <Route path={`categorias/editar/:category_id`} element={<CategoryEdit/>}/>
                    <Route path={`tags/lista`} element={<TagList/>}/>
                    <Route path={`tags/adiciona`} element={<TagAdd/>}/>
                    <Route path={`tags/editar/:tag_id`} element={<TagEdit/>}/>
                    <Route path={`modulos/adiciona/:course_id`} element={<ModuleAdd/>}/>
                    <Route path={`modulos/editar/:module_id/:course_id`} element={<ModuleEdit/>}/>
                    <Route path={`modulos/:module_id/:course_id`} element={<ModuleView/>}/>
                    <Route path={`modulos/:module_id/:course_id/lesson/adiciona`} element={<LessonAdd/>}/>
                    <Route path={`modulos/:module_id/:course_id/lesson/:lesson_id/editar`} element={<LessonEdit/>}/>
                    <Route path={`modulos/:module_id/:course_id/lesson/:lesson_id/ver`} element={<LessonView/>}/>
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/landing" element={<LandingPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesContainer;