import React, {useState} from "react";
import "../App.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useNavigate();
    

    function handleEmailInput(e){
        e.preventDefault()
        setEmail(e.target.value)
    }

    function handlePasswordInput(e){
        e.preventDefault()
        setPassword(e.target.value)
    }


    async function handleSubmit(e){
        e.preventDefault()
        // try{
            var data = await axios.post("http://localhost:5000/photographyconnect-61141/us-central1/api/login",{
                email: email,
                password: password
            }).then(function(response){
                sessionStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
                console.log(response.data.token)
                props.setLoggedIn(true)
                // setLogIn(true)
                
            }).then(function(){
                const token=sessionStorage.getItem("AuthToken")
                const decodedToken= jwt_decode(token);
                // console.log(decodedToken.user_id)
                props.setCurrentUser(decodedToken.user_id)
            }).then(function(){
                history('/')                
            })                
        // }
        // catch(e){
        //     if(e.response.status === 400){
        //       console.log("An error occurred")  
        //     }
        // }
    }
    if(props.loggedIn === true){
        return(
            <div>
                <Navigate replace to="/"/>
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid login-form ">
                <h1>Login</h1>
                {/* <LoginForm/> */}
                <div>
                    <form className="form-input">
                        <div className="input-group mb-3">
                            <input type="text" placeholder="email" className="form-control" value={email} onChange={handleEmailInput} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>   
                        <div className="input-group mb-3 ">
                            <input type="password" placeholder="password" className="form-control" value={password} onChange={handlePasswordInput} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>  
                        <button onClick={handleSubmit} className="btn" type="submit">Submit</button>          
                    </form>
                    <div>
                        <p>Don't have an account? Register <Link to="/register">here</Link></p>
                    </div>              
                </div>  
            </div>

        )        
    }

}

export default Login;