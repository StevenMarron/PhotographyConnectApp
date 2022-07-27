import React from "react";
import "../App.css";
import {Navigate} from "react-router-dom";
import LoginForm from "../components/loginForm";

function Login(props){
    if(props.loggedIn === true){
        return(
            <div>
                <Navigate replace to="/"/>
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid login-form ">
                <h1>Login</h1>
                <LoginForm/>
            </div>

        )        
    }

}

export default Login;