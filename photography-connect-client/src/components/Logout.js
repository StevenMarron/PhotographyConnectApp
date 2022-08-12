import React, {useEffect} from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";
// import axios from "axios";

function Logout(props){
    let history = useNavigate();

    useEffect(function(){
        async function tokenDelete(){
            const token=sessionStorage.getItem("AuthToken")
            sessionStorage.removeItem("AuthToken")
            props.setLoggedIn(false)
            // console.log(token)
            history('/')
            // try{
            //     const token=sessionStorage.getItem("AuthToken")
            //     console.log(token)
            //     const config={
            //             headers:{
            //             Authorization : `${token}` 
            //         }
            //     }
            //    var data = await axios.post("http://localhost:5000/photographyconnect-61141/us-central1/api/logout", config)
            //     .then(function(){
            //         console.log("before remove token")
            //         sessionStorage.removeItem("AuthToken")
            //         console.log("after remove token")
            //         history('/')
            //     })
            // }
            // catch(e){
            //     if(e.response.status === 400){
            //       console.log("An error occurred")  
            //     }
            // }
      }
      tokenDelete()            
      },[])
}

export default Logout;