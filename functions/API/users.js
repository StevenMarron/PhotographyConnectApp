const {db, admin} = require('../util/admin');
// const firebase = require('firebase');
const config = require('../util/config');

// firebase.initializeApp(config);

const {valLogin, valRegister} = require('../util/validators');

//User Login API
exports.loginUser = function(request, response){
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const {validated, errors} = valLogin(user);
    if(!validated) 
        return response.status(400).json(errors);

    // firebase.auth().signInWithEmailandPassword(user.email, user.password).then(function(data){
    admin.auth().signInWithEmailandPassword(user.email, user.password).then(function(data){
        return data.user.getIdToken();
    })
    .then(function(token){
        return response.json({token});
    })
    .catch(function(error){
        console.error(error);
        return response.status(403).json({message: "Wrong email or password"});
    });
}

//SignUp User
// exports.signUpUser = function(request, response){
//     const newUser = {
//         username: request.body.username,
//         email: request.body.email,
//         password: request.body.password,
//         confirmPassword: request.body.confirmPassword
//     }

//     const {validated, errors} = valRegister(newUser);
//     if(!validated) 
//         return response.status(400).json(errors);

//     let token, userId;

//     db.doc(`/users/${newUser.username}`).get().then(function(doc){
//         if (doc.exists){
//             return response.status(400).json({username: "This username already exists"});
//         }
//         else{
//             return firebase.auth().createUserWithEmailAndPassword(
//                 newUser.email,
//                 newUser.password
//             )
//         }
//     })
//     .then(function(data){
//         userId = data.user.uid;
//         return data.user.getIdToken();
//     })
//     .then(function(idToken){
//         token=idToken;
//         const userCred = {
//             username: newUser.username,
//             email: newUser.email,
//         };
//         return db.doc(`/users/${newUser.username}`).set(userCred);
//     })
//     .then(function(){
//         return response.status(201).json({token});
//     })
// }