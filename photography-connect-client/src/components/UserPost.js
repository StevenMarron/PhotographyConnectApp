import React, {useState}  from "react";
import "../App.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";


function UserPost(props){
    const [postIdForEdit, setPostId] = useState('');

    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);
    // console.log(decodedToken.user_id)

    function handlePostSelect(e){
        e.preventDefault()
        setPostId(`${props.postId}`)
    }

    if(decodedToken.user_id === props.userId){
        return(
            <div className="container-fluid">
                
                <div className="post fade-in">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <h2>{props.userFirstName} {props.userLastName}</h2>
                            <p>{props.caption}</p>
                            <Link to={`/profile/post/edit/${postIdForEdit}`}>
                                <button onMouseEnter={handlePostSelect} className="btn button-vis">
                                    Edit Post
                                </button>
                            </Link>
                        </div>

                        <div className="col-lg-8 col-sm-12">
                            <img src={props.imageUrl} className="img-fluid post-image" width="auto" height="400" alt={props.caption} title={props.caption}/>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid">
                
                <div className="post fade-in">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <h2>{props.userFirstName} {props.userLastName}</h2>
                            <p>{props.caption}</p>
                        </div>

                        <div className="col-lg-8 col-sm-12">
                            <img src={props.imageUrl} className="img-fluid post-image" width="auto" height="400"/>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }


}

export default UserPost;