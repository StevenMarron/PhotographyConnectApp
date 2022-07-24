const blankCredential = function(string){
    if (string === '') 
        return true;
    else
        return false;
};

const valEmail = function(email){
    const eRegExpress= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //Regular expression is used to determine if the email address is valid
    if (email.match(eRegExpress)) return true;
    else return false;

}

exports.valLogin = function(data){
    let errors = {};
    if (blankCredential(data.email))
        errors.email = "Email field cannot be empty";
    if (blankCredential(data.password))
        errors.password = "Password field cannot be empty"
    return {
        errors, 
        validated: Object.keys(errors).length === 0 ? true : false
        //Object.keys checks if the errors object has a length of 0, if it does then the params are marked as validated: true
    }
}

exports.valRegister = function(data){
    let errors = {};
    if (blankCredential(data.email)){
        errors.email = "Email field cannot be empty";
    }
    else if (!valEmail(data.email)){
        errors.email = "Please enter a valid email address";
    }

    if (blankCredential(data.password))
        errors.password = "Password field cannot be empty";
        
    if (blankCredential(data.userFirstName))
        errors.userFirstName = "First name field cannot be empty";

    if (blankCredential(data.userLastName))
        errors.userLastName = "Last name field cannot be empty";
                
    if (blankCredential(data.confirmPassword))
        errors.confirmPassword = "Please confirm your password";
    
    if (data.password !== data.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
    
    if (blankCredential(data.occupation))
        errors.occupation = "Please select your occupation";
    return {
        errors, 
        validated: Object.keys(errors).length === 0 ? true : false
    }
}