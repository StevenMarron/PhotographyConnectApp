import React, {useState, useEffect} from "react";
import "../App.css";
import axios from "axios";

function EditPost(props){
    const [caption, setCaption] = useState((props.caption))

    function handleCaptionInput(e){
        e.preventDefault()
        setCaption(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const config={
                    headers:{
                    Authorization : `${token}` 
                }
            }
            var data = await axios.post(`http://localhost:5000/photographyconnect-61141/us-central1/api/post/${props.postId}`,
            {
                caption: caption
            },
            config)
            .then(function(){
                props.setEdit(false)
            })         
        }
        catch(e){
            if(e.response.status === 400){
                console.log("an error occurred")
            }
        }
        
    }

    return( 
        <div className="login-form">
            <form className="form-input">

                <div className="input-group mb-3">
                    <textarea  value={caption} onChange={handleCaptionInput} placeholder="Caption..." className="form-control" aria-label="With textarea"></textarea>
                </div> 
                                                    
                <button onClick={handleSubmit} className="btn" type="submit">Submit</button>          
                
            </form>
        </div>          
    )        
}

export default EditPost;