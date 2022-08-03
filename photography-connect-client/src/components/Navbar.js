import React, {useState, useEffect} from "react";
import "../App.css";
import { Link } from "react-router-dom";
import PCLogo from "../images/Photography-Connect-Logo.png";
import jwt_decode from "jwt-decode";

function Navbar(props){
    const [currentUser, setCurrentUser] = useState('')

    function userCheck(){
        const token=sessionStorage.getItem("AuthToken")
        if(token){
          const decodedToken= jwt_decode(token);
        //   console.log(decodedToken.user_id)
          setCurrentUser(decodedToken.user_id)
        }
          else{
          setCurrentUser('')
        }
    }

    useEffect(function(){
      userCheck()
      },[props.loggedIn])

    if(props.loggedIn){
        return(
            <header className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-lg">
                                <Link to="/" className="navbar-brand" tabIndex="0">
                                    <img src={PCLogo} className="navbar-brand" width="100" height="auto" alt="" />
                                </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav nav-list ms-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link" tabIndex="1">Home</Link>
                                    </li>
                                    <li className="nav-item" onMouseEnter={userCheck}>
                                        <Link to={`/profile/${currentUser}`} className="nav-link" tabIndex="2">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/newpost" className="nav-link" tabIndex="3">New Post</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/logout" className="nav-link" tabIndex="3">Logout</Link>
                                    </li>                                  
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
    else{
        return(
            <header className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-lg">
                                <Link to="/" className="navbar-brand" tabIndex="0">
                                    <img src={PCLogo} className="navbar-brand" width="100" height="auto" alt="" />
                                </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav nav-list ms-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link" tabIndex="1">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link" tabIndex="2">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link" tabIndex="3">Register</Link>
                                    </li>                                
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        );  
    }
    
}

export default Navbar;