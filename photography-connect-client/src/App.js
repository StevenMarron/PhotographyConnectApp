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
import Logout from "./components/Logout";
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [selectedUser, setSelectedUser] = useState("Random user input")


  useEffect(function(){
    function tokenCheck(){
      // console.log(currentUser)
      const token=sessionStorage.getItem("AuthToken")
      if(token){
        setLoggedIn(true)
      }
        else{
        setLoggedIn(false)
      }
  }
  tokenCheck()
  },[])

  return (
    <Router>
      <div className="container-fluid">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/register' element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/logout' element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path='/profile/:userId' element={<Profile selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}/>
        <Route path='/profile/edit/:userId' element={<EditProfile/>}/>
        <Route path='/profile/uploadprofileimage' element={<UploadProfileImage/>}/>
        <Route path='/profile/post/edit/:postId' element={<EditPost />}/>
      </Routes>
      <Footer/>      
      </div>
    </Router>
  );
}

export default App;
