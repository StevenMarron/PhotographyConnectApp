import React from "react";
import "../App.css";
import PostAPI from "./PostAPI";

function LoggedInHome(){
    return(
        <div>
            <h1  className="centered">You're logged in!</h1>
            <PostAPI/>
        </div>
    )
}

export default LoggedInHome;