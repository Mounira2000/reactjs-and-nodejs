import React from "react";
import {
	BrowserRouter as Router,

	Route,
	Routes,  
} from "react-router-dom";
import Login from "../Components/Login/Login";
import LoginWrapper from "./LoginWrapper";
import Register from "../Components/Register/Register";
import Home from "../Components/Home/Home";
import Detail from "../Components/Activities/Details/Detail";
import ListDepartment from "../Components/Activities/ListDepartment.jsx/ListDepartment";
import List from "../Components/Activities/List/List";
import ActivitiesWrapper from "./ActivitiesWrapper";
import FavPlace from "../Components/FavPlace/FavPlace";
import User from "../Components/UserParamater/user";


export default function Routing (){
    return(
        <Router>
            <Routes>
                <Route path="act" element={<ActivitiesWrapper/>}>
                    <Route  path="detail/:id" element={<Detail/>}/>
                    <Route path="listDepartment" element={<ListDepartment/>}/>
                    <Route index element={<List/>}/>
                    <Route path="favPlace" element={<FavPlace/>}/>
                    <Route path="userParameter" element={<User/>}/>
                </Route>

                <Route path="/" element={<LoginWrapper/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route index element={<Home/>}/>
                </Route>

                
            </Routes>
        </Router>
    );
}