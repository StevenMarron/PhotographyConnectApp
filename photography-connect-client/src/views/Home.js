import React from "react";
import "../App.css";
import LoggedInHome from "../components/LoggedInHome";
import LoggedOutHome from "../components/loggedOutHome";

function Home(props){

    if(props.loggedIn){
        return(
       <LoggedInHome />         
        )
    }
    else{
    return(
        <LoggedOutHome/>
    )        
    }

}

export default Home;