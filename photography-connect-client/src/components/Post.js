import React from "react";
import "../App.css";

function Post(props){
    return(
        <div className="post">
            <div className="row">
                <div className="col-lg-4 col-sm-12">
                    <img src={props.userImage} width="20" height="auto"/>
                    <h2>{props.userFirstName} {props.userLastName}</h2>
                    <p>{props.caption}</p>
                </div>
                <div className="col-lg-8 col-sm-12">
                    <img src={props.postImage} width="100" height="auto"/>
                </div>
            </div>            
        </div>
    )
}

export default Post;