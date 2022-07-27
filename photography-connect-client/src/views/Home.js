import React, {useEffect, useState} from "react";
import "../App.css";
import LoggedInHome from "../components/LoggedInHome";
import LoggedOutHome from "../components/loggedOutHome";

function Home(props){
    const [homeLoggedIn, setHomeLoggedIn] = useState(false)

    useEffect(function(){
        function tokenCheck(){
          const token=sessionStorage.getItem("AuthToken")
          if(token){
            setHomeLoggedIn(true)
          }
            else{
            setHomeLoggedIn(false)
          }
      }
      tokenCheck()
      },[])

      props.checkHomeLogIn(homeLoggedIn)


    if(homeLoggedIn){
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