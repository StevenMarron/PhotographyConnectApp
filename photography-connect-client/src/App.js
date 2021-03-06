import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Footer from "./components/Footer";
import Profile from "./views/Profile";
import EditProfile from './components/editProfile';
import UploadProfileImage from './components/UploadProfileImage';
import EditPost from "./components/EditPost";
import axios from 'axios';

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [homeLoggedIn, setHomeLoggedIn] = useState(false)

  const checkHomeLogIn= function checkHomeLogIn(homeLoggedIn){
    console.log(homeLoggedIn)
  }

  useEffect(function(){
    function tokenCheck(){
      const token=sessionStorage.getItem("AuthToken")
      if(token){
        setLoggedIn(true)
      }
        else{
        setLoggedIn(false)
      }
  }
  tokenCheck()
  },[props.homeLoggedIn])

  return (
    <Router>
      <div className="container-fluid">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={<Home checkHomeLogIn={checkHomeLogIn} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/register' element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/edit' element={<EditProfile/>}/>
        <Route path='/profile/uploadprofileimage' element={<UploadProfileImage/>}/>
        <Route path='/profile/post/edit/:postId' element={<EditPost />}/>
      </Routes>
      <Footer/>      
      </div>
    </Router>
  );
}

export default App;
