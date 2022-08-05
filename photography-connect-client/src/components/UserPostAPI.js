import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "../App.css";
import axios from 'axios';
import UserPost from './UserPost';

function UserPostAPI(props){
    const params = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(function(){
        // console.log(props.selectedUser1)
        async function getAllPosts(){
            const token=sessionStorage.getItem("AuthToken")
            const config={
                 headers:{
                    Authorization : `${token}` 
                }
            }
            // var data = await axios.get(`http://localhost:5000/photographyconnect-61141/us-central1/api/user/posts/${params.userId}`, config)
            var data = await axios.get(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/user/posts/${params.userId}`, config)
            // var data = await axios.get(`/user/posts/${params.userId}`, config)
            
            .then(function(response){
            setPosts([response.data])
            // console.log([response.data]);                      
            })        
        }
        getAllPosts()
        // console.log(posts)
        },[params.userId])

    return(
        <div>
        {posts.map(function(i, index){
            return(
                <div key={index}>
                    {Object.values(i).map(function(j,index){
                        return(
                            <div key={i[index].postId}>
                                <UserPost 
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

export default UserPostAPI;