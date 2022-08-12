const {admin, db} = require('./admin');

module.exports = function (request, response, next){
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
        idToken = request.headers.authorization.split('Bearer ')[1];
        //The purpose of splitting the authorization header at 'Bearer ' is to attain just the token which will be at position 1 in the array
    }
    else{
        console.error('No Token');
        return response.status(403).json({error:"No token: access unauthorized"});
    }
    //Using the verifyIdToken module from the firebase-admin SDK to verify the token from the request header
    admin.auth().verifyIdToken(idToken).then(function(decodedToken){
        request.user = decodedToken;
        return db.collection('users').where('email', '==', request.user.email).limit(1).get();
    })
    .then(function(data){
        request.user.userFirstName = data.docs[0].data().userFirstName;
        request.user.userLastName = data.docs[0].data().userLastName;
        request.user.userImageURL = data.docs[0].data().userImageUrl;
        return next();
    })
    .catch(function(error){
        console.error('Could not verify token');
        return response.status(403).json({error:"An error occurred verifying token"});
    })
}