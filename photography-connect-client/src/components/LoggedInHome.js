import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import PostAPI from "./PostAPI";

function LoggedInHome(){
    return(
        <div className="">
            <h1>You're logged in!</h1>
            <PostAPI/>
        </div>
    )
}

export default LoggedInHome;