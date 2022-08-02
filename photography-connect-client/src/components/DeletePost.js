import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "../App.css";
import axios from "axios";


function DeletePost(props){
    const params = useParams();

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const config={
                    headers:{
                    Authorization : `${token}` 
                }
            }
            var data = await axios.delete(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/${params.postId}`, config)
            .then(function(){
                props.setDeletePost(true)
            })         
        }
        catch(e){
            console.log(e)
            if(e.response.status === 400){
                console.log("an error occurred")
            }
        }
        
    }

    return( 
        <div>
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Delete
            </button>
            
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this post?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>          
    )        
}

export default DeletePost;