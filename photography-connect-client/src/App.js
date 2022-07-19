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
import axios from 'axios';
import UploadProfileImage from './components/UploadProfileImage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(function(){
    async function tokenCheck(){
      const token=sessionStorage.getItem("AuthToken")
      if(token){
        setLoggedIn(true)
      }
        else{
        setLoggedIn(false)
      }
  }
  tokenCheck()
  })

  // useEffect(function(){
  //   async function tokenCheck(){
  //     const token=sessionStorage.getItem("AuthToken")
  //     if(token){
  //       const config={
  //         headers:{
  //           Authorization : `Bearer ${token}` 
  //         }
  //       }
  //       var data = await axios.get("http://localhost:5000/photographyconnect-61141/us-central1/api/posts", config)
  //       if(data.status === 200){
  //         setLoggedIn(true)          
  //       }
  //       else{
  //         setLoggedIn(false)          
  //       }
  //     }
  //     else{
  //       setLoggedIn(false)  
  //     }
  // }
  // tokenCheck()
  // })


  return (
    <Router>
      <div className="container-fluid">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/register' element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/profile' element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/profile/edit' element={<EditProfile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        <Route path='/profile/uploadprofileimage' element={<UploadProfileImage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
      </Routes>
      <Footer/>      
      </div>
    </Router>
  );
}

export default App;
