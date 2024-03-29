const {db, admin} = require('../util/admin');
const config = require('../util/config');

//View all posts in the 'posts' collections of the database.
exports.getAllPosts = function(request, response){
    // posts = [
    //     {
    //         'postid':'1',
    //         'userid':'0',
    //         'imageUrl':'0',
    //         'caption':'Test post info',
    //         'createdat':'19:52 24/06/22'
    //     }
    // ]
    // return response.json(posts);

    db.collection('posts').orderBy('createdAt', 'desc').get().then(
        function(data){
            let posts = [];
            data.forEach(function(doc){
                posts.push({
                    postId: doc.id,
                    userId: doc.data().userId,
                    userFirstName: doc.data().userFirstName,
                    userLastName: doc.data().userLastName,
                    caption: doc.data().caption,
                    imageUrl: doc.data().imageUrl,
                    createdAt: doc.data().createdAt
                });
            });
            return response.json(posts);
        }
    )
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
} 

//Get all posts of a specific user
exports.getAllUserPosts = function(request, response){

    db.collection('posts').where('userId', '==', request.params.userId).orderBy('createdAt', 'desc').get().then(
        function(data){
            let posts = [];
            data.forEach(function(doc){
                posts.push({
                    postId: doc.id,
                    userId: doc.data().userId,
                    userFirstName: doc.data().userFirstName,
                    userLastName: doc.data().userLastName,
                    caption: doc.data().caption,
                    imageUrl: doc.data().imageUrl,
                    createdAt: doc.data().createdAt
                });
            });
            return response.json(posts);
        }
    )
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
} 

//Add Post Image
exports.addPostImage = function (request, response){
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
        // console.log("Test String" + os.tmpdir());
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
        // console.log("Different Test String" + imageForUpload.filePath)
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
            return db.doc(`/posts/${request.params.postId}`).update({ imageUrl: imageUrl });
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


//Create new post 
exports.postOnePost = function(request, response){
    console.log(request.user)
    const newPost = {
        userFirstName: request.user.userFirstName,
        userLastName: request.user.userLastName,
        userId: request.user.user_id,
        caption: request.body.caption,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/Image-Upload-Error.jpg?alt=media`,
        createdAt: new Date().toISOString()
    }

    db.collection('posts').add(newPost).then(function(doc){
        const responseNewPost = newPost;
        responseNewPost.id = doc.id;
        return response.json(responseNewPost);
    })
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error});
    });
}

//Delete post
exports.deletePost = function(request, response){
    const document = db.doc(`/posts/${request.params.postId}`);
    document.get().then(function(doc){
        if (!doc.exists){
            return response.status(404).json({error: "Post could not be found"})
        }
        if (doc.data().userId !== request.user.uid){
            return response.status(403).json({error:"You are not authorized to delete this post"})
        }
        else{
            return document.delete();            
        }

    })
    .then(function(){
        response.json({message: "Deleted Post Successfully"});
    })
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
}

//Edit post
exports.editPost = function(request, response){
    if(request.body.postId || request.body.createdAt || request.body.imageUrl){
        response.status(403).json({message:"Cannot be changed"});
    }
    let document = db.collection('posts').doc(request.params.postId);
    document.get().then(function(doc){
        if (doc.data().userId !== request.user.uid){
            return response.status(403).json({error:"You are not authorized to edit this post"})
        }
        else{
            document.update(request.body)            
        }
    })
    .then(function(){
        response.json({message:"Post updated successfully"});
    })
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
}

//GET POST
exports.getPost = function(request, response){
//     let postData= {};
//     db.doc(`/posts/${request.body.postId}`).get()
//     .then(function(doc){
//         if(doc.exists){
//             // userData.userCred=doc.data();
//             return response.json(postData);
//         }     
//     })
//     .catch(function(error){
//         console.error(error);
//         return response.status(500).json({message: "Could not get post data"});
//     });
// }

    const document = db.doc(`/posts/${request.params.postId}`);
        document.get().then(function(doc){
            let post = [{}];
                // return response.json(doc.id)
                post.push({
                    postId: doc.id,
                    userId: doc.data().userId,
                    userFirstName: doc.data().userFirstName,
                    userLastName: doc.data().userLastName,
                    caption: doc.data().caption,
                    imageUrl: doc.data().imageUrl,
                    createdAt: doc.data().createdAt
                });
            return response.json(post);
            })
            .catch(function(error){
                console.error(error);
                    return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
} 