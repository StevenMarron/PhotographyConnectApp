import React, {useState} from "react";
import "../App.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
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
        try{
            // var data = await axios.post("http://localhost:5000/photographyconnect-61141/us-central1/api/login",{
                var data = await axios.post("https://us-central1-photographyconnect-61141.cloudfunctions.net/api/login",{
                    // var data = await axios.post("/login",{
                
                email: email,
                password: password
            }).then(function(response){
                sessionStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
                console.log(response.data.token)
                props.setLoggedIn(true)
                // setLogIn(true)
            }).then(function(){
                history('/')                
            }) 
        }
        catch(e){
            setError(e.response.data.message)
            setErrorEmail(e.response.data.email)
            setErrorPassword(e.response.data.password)
        }
               
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
                        <p className="error">{errorEmail}</p>
                        <div className="input-group mb-3 ">
                            <input type="password" placeholder="password" className="form-control" value={password} onChange={handlePasswordInput} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div> 
                        <p className="error">{errorPassword}</p> 
                        <p className="error">{error}</p>
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