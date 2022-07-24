const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');
cors = require('cors');

app.use(cors())

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {
    getAllPosts,
    //getAllPosts is a function that will be used in the posts.js file to call all posts from all users
    // for use on the home dashboard
    getAllUserPosts,
    postOnePost,
    deletePost,
    editPost

} = require('./API/posts')

const {
    loginUser,
    registerUser,
    uploadUserImage,
    getUserDetails,
    updateUserDetails,
    signOutUser,
    getUsers
    
} = require('./API/users')


app.get('/posts', auth, getAllPosts);
app.get('/user/posts', auth, getAllUserPosts);
//app is referring to 'express'
app.post('/posts', auth, postOnePost);
app.delete('/posts/:postId', auth, deletePost);
app.put('/posts/:postId', auth, editPost);
app.post('/login', loginUser);
app.post('/register', registerUser);
app.post('/user/image', auth, uploadUserImage);
app.get('/user', auth, getUserDetails);
app.post('/user', auth, updateUserDetails);
app.post('/signout', auth, signOutUser);
app.get('/users', auth, getUsers);

exports.api = functions.https.onRequest(app);