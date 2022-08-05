const {db, admin} = require('../util/admin');
const firebase = require('firebase');
const config = require('../util/config');
const cors = require('cors')({origin: true});

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
        userFirstName: request.body.userFirstName,
        userLastName: request.body.userLastName,
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

    // db.doc(`/users/${newUser.email}`).get().then(function(doc){
    db.collection("users").where("email", "==", newUser.email).get()
    .then(function(doc){
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
            userFirstName: request.body.userFirstName,
            userLastName: request.body.userLastName,
            occupation: request.body.occupation,
            email: request.body.email,
            userImageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/Default-User-Image.jpg?alt=media`,
            bio: request.body.bio,
            facebookLink: request.body.facebookLink,
            instaLink: request.body.instaLink,
            createdAt: new Date().toISOString()
        };
        return db.doc(`/users/${userCred.userId}`).set(userCred);
    })
    .then(function(){
        return response.status(201).json({token});
    })    
    .catch(function(error){
        console.error(error);
        return response.status(400).json({message: "This email is already in use"});
    });
  
}

//UPLOAD USER PROFILE IMAGE
exports.uploadUserImage = function (request, response){
    console.log("Busboy upload start")
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    const busboy = new BusBoy({headers: request.headers});

    let imageFilename;
    let imageForUpload = {};

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
        try{
            if (mimetype !== 'image/jpg' && mimetype !== 'image/jpeg'){
                return response.status(400).json({ message: "Uploads must be .jpeg file type"});
        }

        const extension = filename.split('.')[filename.split('.').length - 1];
        imageFilename = `${Math.round(Math.random()*100000)}.${extension}`;
        // return response.json("This is the image filename: "+imageFilename)
        console.log("Test String" + os.tmpdir());
        const filePath = path.join(os.tmpdir(), imageFilename);
        imageForUpload = {filePath, mimetype};
        file.pipe(fs.createWriteStream(filePath));            
        }

        catch(error){
            console.error(error);
            return response.status(500).json({message: "Could not define path"});
        }
    });  
    busboy.on('finish', function(){
        console.log("Different Test String" + imageForUpload.filePath)
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
            return db.doc(`/users/${request.user.uid}`).update({ userImageUrl: imageUrl });
        })
        .then(function(){
            return response.json({message: "Image update succesful"});
        })
        .catch(function(error){
            console.error(error);
            return response.status(500).json({message: "Could not upload photo, an internal server error occurred"});
        });
    });
    // busboy.end(request.rawBody);
    if (request.rawBody) {
        busboy.end(request.rawBody);
    }
    else {
        request.pipe(busboy);
    }
}

//GET USER DETAILS
exports.getUserDetails = function(request, response){
    let userData= {}; 
    db.doc(`/users/${request.params.userId}`).get().then(function(doc){
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
    let document = db.collection('users').doc(`${request.user.uid}`);
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

//GET USERS
exports.getUsers = function (request, response){
    db.collection('users').get().then(
        function(data){
            let users = [];
            data.forEach(function(doc){
                users.push({
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    bio: doc.data().bio,
                    userImageUrl: doc.data().userImageUrl,
                    facebookLink: doc.data().facebookLink,
                    instaLink: doc.data().instaLink
                });
            });
            return response.json(users);
        }
    )
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
}