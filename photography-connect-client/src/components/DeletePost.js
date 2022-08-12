import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../App.css";
import axios from "axios";


function DeletePost(props){
    const params = useParams();
    const history= useNavigate();
    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const config={
                    headers:{
                    Authorization : `${token}` 
                }
            }
            // var data = await axios.delete(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/${params.postId}`, config)
            var data = await axios.delete(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/post/${params.postId}`, config)
            // var data = await axios.delete(`/post/${params.postId}`, config)
            history(`/profile/${decodedToken.user_id}`)         
        }
        catch(e){
            console.log(e)
            if(e.response === 400){
                console.log("an error occurred")
            }
        }
        
    }

    return( 
        <div>
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#deleteModal" >
                Delete
            </button>
            
            <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel"></h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="false">X</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this post?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>          
    )        
}

export default DeletePost;