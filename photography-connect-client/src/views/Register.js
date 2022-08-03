import React, {useState} from "react";
import "../App.css";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

function Register(props){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [occupation, setOccupation] = useState('')
    const [bio, setBio] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [instaLink, setInstaLink] = useState('')
    const [data, setData] = useState('')

    function handleFirstNameInput(e){
        e.preventDefault()
        setFirstName(e.target.value)
    }

    function handleLastNameInput(e){
        e.preventDefault()
        setLastName(e.target.value)
    }

    function handleEmailInput(e){
        e.preventDefault()
        setEmail(e.target.value)
    }

    function handlePasswordInput(e){
        e.preventDefault()
        setPassword(e.target.value)
    }

    function handleConfirmPasswordInput(e){
        e.preventDefault()
        setConfirmPassword(e.target.value)
    }

    function handleOccupationInput(e){
        e.preventDefault()
        setOccupation(e.target.value)
    }

    function handleBioInput(e){
        e.preventDefault()
        setBio(e.target.value)
    }

    function handleFacebookLinkInput(e){
        e.preventDefault()
        setFacebookLink(e.target.value)
    }

    function handleInstaLinkInput(e){
        e.preventDefault()
        setInstaLink(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log(firstName, lastName, occupation, email, password, confirmPassword, bio, facebookLink, instaLink)
        try{
            var data = await axios.post("http://localhost:5000/photographyconnect-61141/us-central1/api/register",{
                userFirstName: firstName,
                userLastName: lastName,
                occupation: occupation,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                bio: bio,
                facebookLink: facebookLink,
                instaLink: instaLink
            }).then(function(response){
                sessionStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
                console.log(response.data.token)
                props.setLoggedIn(true)
            })
            setData(data)
        }
        catch(e){
            if(e.response.status === 400){
              console.log("This email address is already in use with another account")  
            }
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
                <h1>Register</h1>
                <div>
                <form className="form-input">
                    <div className="input-group mb-3">
                        <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <div className="input-group mb-3">
                        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>  

                    <div className="input-group mb-3">
                        <input type="text" placeholder="Email" value={email} onChange={handleEmailInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>   

                    <div className="input-group mb-3">
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div> 

                    <div className="input-group mb-3 ">
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <div className="input-group mb-3">
                        <select value={occupation} onChange={handleOccupationInput} className="form-select" id="inputGroupSelect02">
                            <option defaultValue>Please Select Your Occupation..</option>
                            <option value="Photographer">Photographer</option>
                            <option value="Model">Model</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <textarea  value={bio} onChange={handleBioInput} placeholder="Bio" className="form-control" aria-label="With textarea"></textarea>
                    </div> 

                    <div className="input-group mb-3">
                        <input type="text" placeholder="Facebook URL" value={facebookLink} onChange={handleFacebookLinkInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>  

                    <div className="input-group mb-3">
                        <input type="text" placeholder="Instagram URL" value={instaLink} onChange={handleInstaLinkInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                                                        
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>          
                    
                    </form>
            <div>
                <p>Already have an account? Log in <Link to="/login">here</Link></p>
            </div>    
        </div>          
            </div>

        )        
    }


}

export default Register;