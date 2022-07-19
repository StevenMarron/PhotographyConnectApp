import React from "react";
import "../App.css";
import LoggedOutHome from "../components/loggedOutHome";

function Home(props){

    if(props.loggedIn){
        return(
       <div>You are logged In!</div>            
        )
    }
    else{
    return(
        <LoggedOutHome/>
    )        
    }

}

export default Home;