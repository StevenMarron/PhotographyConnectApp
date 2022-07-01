const blankCredential = function(string){
    if (string.trim() === '') 
        return true;
    else
        return false;
};

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