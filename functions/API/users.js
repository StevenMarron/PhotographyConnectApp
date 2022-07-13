const {db, admin} = require('../util/admin');
const firebase = require('firebase');
const config = require('../util/config');

firebase.initializeApp(config);

const {valLogin, valRegister} = require('../util/validators');

//USER LOGIN
exports.loginUser = function(request, response){
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const {validated, errors} = valLogin(user);
    if(!validated) 
        return response.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(data){
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

//REGISTER USER TO THE "USER COLLECTION" OF FIRESTORE AND AUTHENTICATION
exports.registerUser = function(request, response){
    const newUser = {
        userFirstName: request.body.userfirstname,
        userLastName: request.body.userlastname,
        occupation: request.body.occupation,
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        bio: request.body.bio,
        facebookLink: request.body.facebookLink,
        instaLink: request.body.instaLink
    };

    const {validated, errors} = valRegister(newUser);
    if(!validated) 
        return response.status(400).json(errors);

    let token, userId;

    db.doc(`/users/${newUser.email}`).get().then(function(doc){
        if (doc.exists){
            return response.status(400).json({username: "This email address is already in use"});
        }
        else{
            return firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            )
        }
    })
    .then(function(data){
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(function(idToken){
        token=idToken;
        const userCred = {
            userId,
            firstName: newUser.userFirstName,
            lastName: newUser.userLastName,
            occupation: newUser.occupation,
            email: newUser.email,
            userImageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/Default-User-Image.jpg?alt=media`,
            bio: newUser.bio,
            facebookLink: newUser.facebookLink,
            instaLink: newUser.instaLink,
            createdAt: new Date().toISOString()
        };
        return db.doc(`/users/${newUser.email}`).set(userCred);
    })
    .then(function(){
        return response.status(201).json({token});
    })
}

exports.uploadUserImage = function (request, response){
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    const busboy = new BusBoy({headers: request.headers});

    let imageFilename;
    let imageForUpload = {};

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
        if (mimetype !== 'image/jpeg'){
            return response.status(400).json({ error: "Uploads must be .jpeg file type"});
        }

        const extension = filename.split('.')[filename.split('.').length - 1];
        imageFilename = `${Math.round(Math.random()*100000)}.${extension}`;
        const filePath = path.join(os.tmpdir(), imageFilename);
        imageForUpload = {filePath, mimetype};
        file.pipe(fs.createWriteStream(filePath));
    });
    busboy.on('finish', function(){
        admin.storage().bucket().upload(imageForUpload.filePath,{
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageForUpload.mimetype
                }
            }
        })
        .then(function(){
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFilename}?alt=media`;
            return db.doc(`/users/${request.user.email}`).update({ userImageUrl: imageUrl });
        })
        .then(function(){
            return response.json({message: "Image update succesful"});
        })
        .catch(function(error){
            console.error(error);
            return response.status(500).json({message: "Could not upload photo, an internal server error occurred"});
        });
    });
    busboy.end(request.rawBody);
}

//GET USER DETAILS
exports.getUserDetails = function(request, response){
    let userData= {};
    db.doc(`/users/${request.user.email}`).get().then(function(doc){
        if(doc.exists){
            userData.userCred=doc.data();
            return response.json(userData);
        }     
    })
    .catch(function(error){
        console.error(error);
        return response.status(500).json({message: "Could not get user data"});
    });
}

//UPDATE USER DETAILS
exports.updateUserDetails = function(request, response){
    let document = db.collection('users').doc(`${request.user.email}`);
    document.update(request.body).then(function(){
        response.json({message: "user details updated successfully"})
    })
    .catch(function(error){
        console.error(error);
        return response.status(500).json({message: "Could not update user data"});
    });   
}

//USER SIGN OUT
exports.signOutUser = function(request, response){
    firebase.auth().signOut().then(function(){
        console.log("User was logged out");
    })
    .catch(function(error){
        console.error(error);
        return response.status(401).json({message: "Could not log out"});
    });   
}