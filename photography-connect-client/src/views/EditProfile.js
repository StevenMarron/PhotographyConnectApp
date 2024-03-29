import React, {useState, useEffect} from "react";
import "../App.css";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProfile(){
    const params = useParams();
    const userId= params.userId;
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [occupation, setOccupation] = useState('')
    const [bio, setBio] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [instaLink, setInstaLink] = useState('')
    const [bioUpdated, setBioUpdated] = useState(false)
    const [error, setError] = useState('')

    function handleFirstNameInput(e){
        e.preventDefault()
        setFirstName(e.target.value)
    }

    function handleLastNameInput(e){
        e.preventDefault()
        setLastName(e.target.value)
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

    useEffect(function(){
        async function getUserDetails(){
            const token=sessionStorage.getItem("AuthToken")
            const config={
                 headers:{
                    Authorization : `${token}` 
                }
            }
            // var data = await axios.get(`http://localhost:5000/photographyconnect-61141/us-central1/api/user/${userId}`, config)
            var data = await axios.get(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/user/${userId}`, config)
            // var data = await axios.get(`/user/${userId}`, config)
            .then(function(response){
                setFirstName(response.data.userCred.userFirstName)
                setLastName(response.data.userCred.userLastName)
                setOccupation(response.data.userCred.occupation)
                setBio(response.data.userCred.bio)
                // setFacebookLink('https://www.facebook.com/')
                setFacebookLink(response.data.userCred.facebookLink)
                setInstaLink(response.data.userCred.instaLink)
            console.log(response.data);               
            })
        }
        getUserDetails()
        },[])

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const token=sessionStorage.getItem("AuthToken")
            const config={
                    headers:{
                    Authorization : `${token}` 
                }
            }
            // var data = await axios.post(`http://localhost:5000/photographyconnect-61141/us-central1/api/user/${userId}`,
            var data = await axios.post(`https://us-central1-photographyconnect-61141.cloudfunctions.net/api/user/${userId}`,
            // var data = await axios.post(`/user/${userId}`,
            
            {
                firstName: firstName,
                lastName: lastName,
                occupation: occupation,
                bio: bio,
                facebookLink: facebookLink,
                instaLink: instaLink
            },
            config)
            .then(function(){
                setBioUpdated(true)
            })              
        }
        catch(e){
            setError(e.response.data.message)
        }
        
    }

    if(bioUpdated){
        return(
            <Navigate replace to={`/profile/${userId}`}/>            
        )
    }
    else{
        return( 
            <div className="login-form">
                <form className="form-input">
                    <div className="input-group mb-3">
                        <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <div className="input-group mb-3">
                        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
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
                    <p className="error">{error}</p>                                
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>          
                    
                </form>
            </div>          
        )        
    }

    }

export default EditProfile;