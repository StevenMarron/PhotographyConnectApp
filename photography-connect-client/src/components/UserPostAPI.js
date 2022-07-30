import React, {useState, useEffect} from "react";
import "../App.css";
import axios from 'axios';
import UserPost from './UserPost';

function UserPostAPI(props){
    const [posts, setPosts] = useState([]);
    const [selectedUser2, setSelectedUser2] = useState(props.selectedUser1);

    useEffect(function(){
        // console.log(props.selectedUser1)
        async function getAllPosts(){
            const token=sessionStorage.getItem("AuthToken")
            const config={
                 headers:{
                    Authorization : `${token}` 
                }
            }
            var data = await axios.get(`http://localhost:5000/photographyconnect-61141/us-central1/api/user/posts/${selectedUser2}`, config)
            .then(function(response){
            setPosts([response.data])
            // console.log([response.data]);                      
            })        
        }
        getAllPosts()
        // console.log(posts)
        },[])

    return(
        <div>
        {posts.map(function(i, index){
            return(
                <div key={index}>
                    {i.map(function(j,index){
                        return(
                            <div key={index}>
                                <UserPost 
                                    setSelectedUser2={setSelectedUser2}
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