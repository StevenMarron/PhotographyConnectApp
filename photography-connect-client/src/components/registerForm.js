import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function RegisterForm(){
    return( 
        <div>
            <form className="form-input">
                <div class="input-group mb-3">
                    <input type="text" placeholder="First Name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>

                <div class="input-group mb-3">
                    <input type="text" placeholder="Last Name" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>  

                <div class="input-group mb-3">
                    <input type="text" placeholder="Email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>   

                <div class="input-group mb-3">
                    <input type="password" placeholder="Password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div> 

                <div class="input-group mb-3 ">
                    <input type="password" placeholder="Confirm Password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>

                <div class="input-group mb-3">
                    <select class="form-select" id="inputGroupSelect02">
                        <option selected>Please Select Your Occupation..</option>
                        <option value="photographer">Photographer</option>
                        <option value="model">Model</option>
                    </select>
                </div>

                <div class="input-group mb-3">
                    <textarea placeholder="Bio" class="form-control" aria-label="With textarea"></textarea>
                </div> 

                <div class="input-group mb-3">
                    <input type="text" placeholder="Facebook URL" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>  

                <div class="input-group mb-3">
                    <input type="text" placeholder="Instagram URL" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                                                    
                <button class="btn" type="submit">Submit</button>          
                
            </form>
            <div>
                <p>Already have an account? Log in <Link to="/login">here</Link></p>
            </div>    
        </div>          
    )
}

export default RegisterForm;