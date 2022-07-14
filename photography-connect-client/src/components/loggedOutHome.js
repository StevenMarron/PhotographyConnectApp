import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function LoggedOutHome(){
    return(
        <div className="logged-out-home-hero">
            <div className="home-hero-content">
                <div className="home-hero-text centered">
                    <h1>Welcome to Photography Connect</h1>
                    <p>
                    Photography connect is an application designed by amateur photographer Steven Marron
                    that allows for the sharing of photographic content. The goal of the application is to
                    help models and photographers to connect to one another for the purpose of developing professional
                    relationships
                    </p>
                        <button className="btn btn-lg">
                            <Link to="/login" className="nav-link">Login</Link>
                        </button> 
                        <button className="btn btn-lg">
                            <Link to="/register" className="nav-link">Register</Link>
                        </button>  
                </div>
            </div>
        </div>


    )
}

export default LoggedOutHome;