const functions = require('firebase-functions');
const app = require('express')();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {
    getAllPosts,
    //getAllPosts is a function that will be used in the posts.js file
    postOnePost,
    deletePost,
    editPost

} = require('./API/posts')

const {
    loginUser
} = require('./API/users')


app.get('/posts', getAllPosts);
//app is referring to 'express'
app.post('/posts', postOnePost);
app.delete('/posts/:postId', deletePost);
app.put('/posts/:postId', editPost);
app.post('/login', loginUser);

exports.api = functions.https.onRequest(app);