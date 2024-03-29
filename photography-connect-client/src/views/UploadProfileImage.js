import React, {useState} from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function UploadProfileImage(){
    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);
    const [userImage, setUserImage] = useState()
    const [imageUpdated, setImageUpdated] = useState(false)
    const [error, setError] = useState();

    function handleImageInput(e){
        e.preventDefault()
        setUserImage(e.target.files[0])
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const formData = new FormData();
            formData.append('file', userImage)
            // var data = await axios.post("http://localhost:5001/photographyconnect-61141/us-central1/api/user/image", formData, {headers:{
                var data = await axios.post("https://us-central1-photographyconnect-61141.cloudfunctions.net/api/user/image", formData, {headers:{
                    // var data = await axios.post("/user/image", formData, {headers:{
                    'Authorization' : `${token}`,
                    'Accept' : `multipart/form-data`
            }})
            .then(function(){
                setImageUpdated(true)
            })              
        }
        catch(e){
            setError(e.response.data.error)
        }
        
    }

    if(imageUpdated){
        return(
            <Navigate replace to={`/profile/${decodedToken.user_id}`}/>            
        )
    }
    else{
        return( 
            <div className="login-form">
                <form className="form-input login-form">
                    <div>
                        <label className="form-label">Please choose an image.. <br></br>(Image must be .jpeg/.jpg and under 10MB)</label>
                        <input onChange={handleImageInput} className="form-control form-control-lg" id="formFileLg" type="file"/>
                    </div>
                    <p className="error">{error}</p>                                   
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>          
                    
                </form>
            </div>          
        )        
    }

    }

export default UploadProfileImage;