import React, {useState, useEffect} from "react";
import "../App.css";
import axios from "axios";
import FacebookImage from "../images/Facebook-logo.png";
import InstaImage from "../images/Instagram-logo.png";
import {Link, useParams} from "react-router-dom";
import UserPostAPI from "../components/UserPostAPI";
import jwt_decode from "jwt-decode";

function Profile(){
    const params = useParams();
    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [bio, setBio] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [instaLink, setInstaLink] = useState('')
    const [userImage, setUserImage] = useState('')
    const [selectedUser1, setSelectedUser1] = useState(params.userId)



    useEffect(function(){
        async function getUserDetails(){
            // setSelectedUser1(decodedToken.user_id)
            // console.log(params.userId)
            // setSelectedUser1(params.userId)
            // console.log(selectedUser1)
            const config={
                 headers:{
                    Authorization : `${token}` 
                }
            }
            // var data = await axios.get(`http://localhost:5000/photographyconnect-61141/us-central1/api/user/${params.userId}`, config)
            var data = await axios.get(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/user/${params.userId}`, config)
            // var data = await axios.get(`/user/${params.userId}`, config)
            
            .then(function(response){
                setFirstName(response.data.userCred.userFirstName)
                setLastName(response.data.userCred.userLastName)
                setOccupation(response.data.userCred.occupation)
                setBio(response.data.userCred.bio)
                // setFacebookLink('https://www.facebook.com/')
                setFacebookLink(response.data.userCred.facebookLink)
                setInstaLink(response.data.userCred.instaLink)
                setUserImage(response.data.userCred.userImageUrl)
            // console.log(response.data);               
            })
        }
        getUserDetails()
        },[params.userId])

    if(params.userId === decodedToken.user_id){
        if(instaLink !== "" && facebookLink === ""){
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links:
                                    <a className="social-link" href={instaLink} target="_blank" rel="noreferrer noopener">
                                        <img src={InstaImage} className="img-fluid mx-auto" width="30px" alt="Instagram Link" title="Instagram Link"  />                                
                                    </a>                            
                                </p>
                                <Link to={`/profile/edit/${params.userId}`}>
                                    <button className="btn">
                                        Edit Bio
                                    </button>
                                </Link>
                                <Link to="/profile/uploadprofileimage">
                                    <button className="btn">
                                        Upload Profile Image
                                    </button>
                                </Link>
                            </div>
        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <Link className="link" to={`/newpost`}>
                                <button className="btn new-post-button">New Post</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                            <UserPostAPI selectedUser1={selectedUser1} currentUserId={decodedToken.user_id}/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
        else if(instaLink === "" && facebookLink !== ""){
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links:
                                    <a className="social-link" href={facebookLink} target="_blank" rel="noreferrer noopener">
                                        <img src={FacebookImage} className="img-fluid mx-auto" width="30px" alt="Facebook Link" title="Facebook Link"  />                                
                                    </a>                          
                                </p>
                                <Link to={`/profile/edit/${params.userId}`}>
                                    <button className="btn">
                                        Edit Bio
                                    </button>
                                </Link>
                                <Link to="/profile/uploadprofileimage">
                                <button className="btn">
                                    Upload Profile Image
                                </button>
                                </Link>
                            </div>
        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <Link className="link" to={`/newpost`}>
                                <button className="btn new-post-button">New Post</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                        <UserPostAPI selectedUser1={selectedUser1}/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
        else if(instaLink === "" && facebookLink === ""){
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links: No social links to display                         
                                </p>
                                <Link to={`/profile/edit/${params.userId}`}>
                                    <button className="btn">
                                        Edit Bio
                                    </button>
                                </Link>
                                <Link to="/profile/uploadprofileimage">
                                <button className="btn">
                                    Upload Profile Image
                                </button>
                                </Link>
                            </div>
        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <Link className="link" to={`/newpost`}>
                                <button className="btn new-post-button">New Post</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                        <UserPostAPI selectedUser1={selectedUser1}/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
        else{
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links:
                                    <a className="social-link" href={facebookLink} target="_blank" rel="noreferrer noopener">
                                        <img src={FacebookImage} className="img-fluid mx-auto" width="30px" alt="Facebook Link" title="Facebook Link" />                                
                                    </a>
                                    <a className="social-link" href={instaLink} target="_blank" rel="noreferrer noopener">
                                        <img src={InstaImage} className="img-fluid mx-auto" width="30px" alt="Instagram Link" title="Instagram Link"  />                                
                                    </a>                            
                                </p>
                                    <Link to={`/profile/edit/${params.userId}`}>
                                        <button className="btn">
                                            Edit Bio
                                        </button>
                                    </Link>
                                <button className="btn">
                                    <Link to="/profile/uploadprofileimage">
                                        Upload Profile Image
                                    </Link>
                                </button>
                            </div>
        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <Link className="link" to={`/newpost`}>
                                <button className="btn new-post-button">New Post</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <Link className="link" to={`/newpost`}>
                                <button className="btn new-post-button">New Post</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                            <UserPostAPI/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
    }
    else{
        if(instaLink !== "" && facebookLink === ""){
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links:
                                    <a className="social-link" href={instaLink} target="_blank" rel="noreferrer noopener">
                                        <img src={InstaImage} className="img-fluid mx-auto" width="30px" alt="Instagram Link" title="Instagram Link" />                                
                                    </a>                            
                                </p>
                            </div>
        
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                            <UserPostAPI selectedUser1={selectedUser1}/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
        else if(instaLink === "" && facebookLink !== ""){
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links:
                                    <a className="social-link" href={facebookLink} target="_blank" rel="noreferrer noopener">
                                        <img src={FacebookImage} className="img-fluid mx-auto" width="30px" alt="Facebook Link" title="Facebook Link" />                                
                                    </a>                          
                                </p>
                            </div>
        
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                        <UserPostAPI selectedUser1={selectedUser1}/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
        else if(instaLink === "" && facebookLink === ""){
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links: No social links to display                         
                                </p>
                            </div>
        
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                        <UserPostAPI selectedUser1={selectedUser1}/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
        else{
            return(
                <div className="container-fluid profile-page">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12">
                            <div className="bio-card">
                                <img src={userImage} className="img-fluid profile-image mx-auto" alt="user profile picture" title="user profile picture" />                        
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="bio-card">
                                <h1 className="bio-username">{firstName} {lastName}</h1>
                                <p>
                                    Occupation: {occupation}
                                </p>
                                <p>
                                    Bio: {bio}
                                </p>
                                <p>
                                    Social Links:
                                    <a className="social-link" href={facebookLink} target="_blank" rel="noreferrer noopener">
                                        <img src={FacebookImage} className="img-fluid mx-auto" width="30px" alt="Facebook Link" title="Facebook Link" />                                
                                    </a>
                                    <a className="social-link" href={instaLink} target="_blank" rel="noreferrer noopener">
                                        <img src={InstaImage} className="img-fluid mx-auto" width="30px" alt="Instagram Link" title="Instagram Link"  />                                
                                    </a>                            
                                </p>
                            </div>
        
                        </div>
                    </div>
                    <div className="row profile-posts">
                        <div className="col-lg-12 col-sm-12">
                            <UserPostAPI/>
                            
                        </div>
                    </div>
                </div>
        
            )
        }
    }


}

export default Profile;