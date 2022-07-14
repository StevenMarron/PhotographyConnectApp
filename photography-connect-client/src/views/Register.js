import React from "react";
import "../App.css";
import RegisterForm from "../components/registerForm";

function Register(){
    return(
        <div className="container-fluid login-form ">
            <h1>Register</h1>
            <RegisterForm/>
        </div>

    )
}

export default Register;