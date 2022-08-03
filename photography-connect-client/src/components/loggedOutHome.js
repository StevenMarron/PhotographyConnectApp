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
                    Photography connect is an application
                    that allows for the sharing of photographic content. The goal of the application is to
                    help models and photographers to discover one another for the purpose of developing professional
                    relationships
                    </p>
                    <br></br>
                    <p>
                    PLEASE NOTE: This application is a college project and is not intended for use at this time.
                    Please do NOT enter sensitive or personal data into this application, thank you.
                    </p>
                    <Link to="/login" >
                        <button className="btn btn-lg">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-lg">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default LoggedOutHome;