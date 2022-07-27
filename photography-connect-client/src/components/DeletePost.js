import React, {useState, useEffect} from "react";
import "../App.css";
import axios from "axios";

function DeletePost(props){

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const config={
                    headers:{
                    Authorization : `${token}` 
                }
            }
            var data = await axios.delete(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/${props.postId}`, config)
            .then(function(){
                props.setDeletePost(true)
            })         
        }
        catch(e){
            if(e.response.status === 400){
                console.log("an error occurred")
            }
        }
        
    }

    return( 
        <div>
            <div>
                Are you sure you want to delete this post?
            </div>
            <button onClick={handleSubmit} className="btn" type="submit">Yes, delete it</button>       
        </div>          
    )        
}

export default DeletePost;