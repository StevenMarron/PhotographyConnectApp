import React, {useState}  from "react";
import "../App.css";
import EditPost from "../components/EditPost";
import DeletePost from "../components/DeletePost";

function Post(props){
    const [postIdForEdit, setPostId] = useState('');
    const [postCaption, setPostCaption] = useState('');
    const [edit, setEdit] = useState(false);
    const [deletePost, setDeletePost] = useState(false);

    function handlePostSelect(e){
        e.preventDefault()
        setPostId(`${props.postId}`)
        setPostCaption(`${props.caption}`)
    }

    function handlePostEdit(e){
        e.preventDefault()      
        setEdit(true)
    }

    function handlePostDelete(e){
        e.preventDefault()      
        setDeletePost(true)
    }

    return(
        <div className="container-fluid">
            
            <div className="post fade-in">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <h2>{props.userFirstName} {props.userLastName}</h2>
                        <p>{props.caption}</p>
                        <button onMouseEnter={handlePostSelect} onClick={handlePostEdit} className="btn">
                            Edit Post
                        </button>
                        {edit ? <EditPost postId={postIdForEdit} edit={edit} setEdit={setEdit} caption={postCaption} /> : null}
                        <button onMouseEnter={handlePostSelect} onClick={handlePostDelete} className="btn">
                            Delete Post
                        </button>
                        {deletePost ? <DeletePost postId={postIdForEdit} deletePost={deletePost} setDeletePost={setDeletePost}/> : null}
                    </div>
                    <div className="col-lg-8 col-sm-12">
                        <img src={props.imageUrl} className="img-fluid post-image" width="auto" height="400"/>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Post;