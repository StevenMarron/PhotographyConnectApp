import React from "react";
import "../App.css";
import {Navigate} from "react-router-dom";
import RegisterForm from "../components/registerForm";

function Register(props){
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
                <h1>Register</h1>
                <RegisterForm/>
            </div>

        )        
    }


}

export default Register;