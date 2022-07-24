import React from "react";
import "../App.css";

function Post(props){
    // console.log(props.userFirstName)
    return(
        <div className="container-fluid">
            <div className="post">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        {/* <img src={props.post.userImage} width="100" height="auto"/> */}
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

export default Post;