import React, {useState, useEffect} from "react";
import "../App.css";
import axios from 'axios';
import Post from './Post';

function PostAPI(){
    const [posts, setPosts] = useState([]);

    useEffect(function(){
        async function getAllPosts(){
            console.log("TESTING API CALL")
            const token=sessionStorage.getItem("AuthToken")
            const config={
                 headers:{
                    Authorization : `${token}` 
                }
            }
            // var data = await axios.get("http://localhost:5000/photographyconnect-61141/us-central1/api/posts", config)
            var data = await axios.get("https://us-central1-photographyconnect-61141.cloudfunctions.net/api/posts", config)
            // var data = await axios.get("/posts", config)
            .then(function(response){
            // console.log(response.data);
            setPosts([response.data])
                                  
            })      
            .catch((error) => {
                console.error(error.message);
            });        
        }
        getAllPosts()
        // console.log(posts)
        },[])

    return(
        <div>
        {posts.map(function(i, index){
            return(
                <div key={index}>
                    {Object.values(i).map(function(j,index){
                        return(
                            <div key={i[index].postId}>
                                <Post 
                                    userFirstName={i[index].userFirstName}
                                    userLastName={i[index].userLastName}
                                    userId={i[index].userId}
                                    imageUrl={i[index].imageUrl}
                                    caption={i[index].caption}
                                    postId={i[index].postId}
                                />
                            </div>    
                        )
                    })}                              
                </div>
            );
        })}
    </div>
    )
}

export default PostAPI;