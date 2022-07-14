import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function LoginForm(){
    return(
        <div>
            <form className="form-input">
                <div class="input-group mb-3">
                    <input type="text" placeholder="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>   
                <div class="input-group mb-3 ">
                    <input type="password" placeholder="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>  
                <button class="btn" type="submit">Submit</button>          
            </form>
            <div>
                <p>Don't have an account? Register <Link to="/register">here</Link></p>
            </div>              
        </div>         
    )
}

export default LoginForm;