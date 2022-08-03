import React, {useState}  from "react";
import "../App.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";


function Post(props){
    const [postIdForEdit, setPostId] = useState('');

    const token=sessionStorage.getItem("AuthToken")
    const decodedToken= jwt_decode(token);
    // console.log(decodedToken.user_id)

    function handlePostSelect(e){
        e.preventDefault()
        setPostId(`${props.postId}`)
    }

    // function handleUserSelect(e){
    //     e.preventDefault()
    //     console.log(props.userId)
    // }

    if(decodedToken.user_id === props.userId){
        return(
            <div className="container-fluid">
                
                <div className="post fade-in">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12">
                            <Link to={`/profile/${decodedToken.user_id}`}>
                                <h2>{props.userFirstName} {props.userLastName}</h2>
                            </Link>
                            
                            <p>{props.caption}</p>
                            
                            <Link to={`/profile/post/edit/${postIdForEdit}`}>
                                <button onMouseEnter={handlePostSelect} className="btn button-vis">
                                    Edit Post
                                </button>
                            </Link>
                            
                            {/* {edit ? <EditPost postId={postIdForEdit} edit={edit} setEdit={setEdit} caption={postCaption} /> : null} */}
                            {/* <button onMouseEnter={handlePostSelect} onClick={handlePostDelete} className="btn">
                                Delete Post
                            </button>
                            {deletePost ? <DeletePost postId={postIdForEdit} deletePost={deletePost} setDeletePost={setDeletePost}/> : null} */}
                        </div>

                        <div className="col-lg-8 col-sm-12">
                            <img src={props.imageUrl} className="img-fluid post-image" width="auto" height="400"/>
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
                            <Link to={`/profile/${props.userId}`}>
                                <h2>{props.userFirstName} {props.userLastName}</h2>
                            </Link>
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

export default Post;