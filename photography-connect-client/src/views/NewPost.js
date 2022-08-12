import React, {useState} from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function NewPost(props){
    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);
    const [caption, setCaption] = useState();
    const [image, setImage] = useState();
    const [error, setError] = useState();
    let history = useNavigate();


    function handleCaptionInput(e){
        e.preventDefault()
        setCaption(e.target.value)
    }

    function handleImageInput(e){
        e.preventDefault()
        setImage(e.target.files[0])
    }

    async function handleSubmit(e){
        e.preventDefault()  
        let postId;         
        if(image == null){
                setError("Please select an image to upload")
            }
        else{
            try{
                const token=sessionStorage.getItem("AuthToken")
                const config={
                        headers:{
                        Authorization : `${token}` 
                    }
                }
                // var data = await axios.post(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/new`,
                var data = await axios.post(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/post/new`,
                // var data = await axios.post(`/post/new`,
                
                {
                    caption: caption
                },
                config)
                .then(async function(response){
                    console.log(response.data.id)
                    postId=(response.data.id)
                    const formData = new FormData();
                    formData.append('file', image)
                    // var data = await axios.post(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/image/${postId}`, formData, 
                    var data = await axios.post(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/post/image/${postId}`, formData,
                    // var data = await axios.post(`/post/image/${postId}`, formData, 
                    {headers:
                        {
                            'Authorization' : `${token}`,
                            'Accept' : `multipart/form-data`
                        }
                    }) 
                })  
                history(`/profile/${decodedToken.user_id}`)
            }    
            catch(e){
                setError(e.response.data.message)
                const token=sessionStorage.getItem("AuthToken")
                const config={
                        headers:{
                        Authorization : `${token}` 
                    }
                }
                var data = await axios.delete(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/post/${postId}`, config)
                // console.log(postId)
                
            }
        }   
    }

    return( 
        <div className="login-form">
            <form className="form-input">
                <div className="input-group mb-3 centered">
                    <label className="form-label">Please choose an image.. <br></br>(Image must be .jpeg/.jpg and under 10MB)</label>
                    
                </div>
                <div className="input-group mb-3">
                    <input onChange={handleImageInput} className="form-control form-control-lg" id="formFileLg" type="file"/>
                </div>

                <div className="input-group mb-3">
                    <textarea  value={caption} onChange={handleCaptionInput} placeholder="Caption..." className="form-control" aria-label="With textarea"></textarea>
                </div> 
                <p className="error">{error}</p>                             
                <button onClick={handleSubmit} className="btn" type="submit">Submit</button>    

                
            </form>
        </div>          
    )             
}

export default NewPost;