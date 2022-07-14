import React from "react";
import "../App.css";
import LoginForm from "../components/loginForm";

function Login(){
    return(
        <div className="container-fluid login-form ">
            <h1>Login</h1>
            <LoginForm/>
        </div>

    )
}

export default Login;