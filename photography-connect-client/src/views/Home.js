import React, {useEffect, useState} from "react";
import "../App.css";
import LoggedInHome from "../components/LoggedInHome";
import LoggedOutHome from "../components/loggedOutHome";

function Home(props){
    const [homeLogIn, setHomeLogIn] = useState(false)

    useEffect(function(){
        function tokenCheck(){
          const token=sessionStorage.getItem("AuthToken")
          if(token){
            setHomeLogIn(true)
          }
            else{
            setHomeLogIn(false)
          }
      }
      tokenCheck()            
      },[])

      // props.checkHomeLogIn(homeLogIn)


    if(homeLogIn){
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