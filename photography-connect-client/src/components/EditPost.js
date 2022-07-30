import React, {useState, useEffect} from "react";
import "../App.css";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import DeletePost from "./DeletePost";
import jwt_decode from "jwt-decode";

function EditPost(props){
    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);
    const params = useParams();
    const [caption, setCaption] = useState();
    const [imageUrl, setImageUrl] = useState();
    let history = useNavigate();


    function handleCaptionInput(e){
        e.preventDefault()
        setCaption(e.target.value)
    }

    useEffect(function(){
        async function getPost(){
            const token=sessionStorage.getItem("AuthToken")
            const config={
                 headers:{
                    Authorization : `${token}` 
                }
            }
            var data = await axios.get(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/${params.postId}`, config)
            .then(function(response){
                setCaption(response.data[1].caption)
                setImageUrl(response.data[1].imageUrl)
                console.log(response.data[1])
                console.log(params)
            // console.log(response.data);               
            })
        }
        getPost()
        },[])

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const config={
                    headers:{
                    Authorization : `${token}` 
                }
            }
            var data = await axios.post(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/${params.postId}`,
            {
                caption: caption
            },
            config)  
            history(`/profile/${decodedToken.user_id}`)
        }
        catch(e){
            if(e.response.status === 400){
                console.log("an error occurred")
            }
        }  
    }

    return( 
        <div className="login-form">
            <div className="col-lg-12 col-sm-12">
                <img src={imageUrl} className="img-fluid post-image"/>
            </div>
            <form className="form-input">

                <div className="input-group mb-3">
                    <textarea  value={caption} onChange={handleCaptionInput} placeholder="Caption..." className="form-control" aria-label="With textarea"></textarea>
                </div> 
                                                    
                <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                <div>
                    <DeletePost/>    
                </div>          
                
            </form>
        </div>          
    )             
}

export default EditPost;