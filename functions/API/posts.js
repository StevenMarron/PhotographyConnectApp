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

exports.getAllUserPosts = function(request, response){

    db.collection('posts').where('userId', '==', request.user.uid).orderBy('createdAt', 'desc').get().then(
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
//Create new post 
//TODO add if statement for empty imageUrl
exports.postOnePost = function(request, response){

//Busboy package used for image upload
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    // return response.json(BusBoy);
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
            const newPost = {
                userFirstName: request.user.userFirstName,
                userLastName: request.user.userLastName,
                userId: request.user.userId,
                caption: request.body.caption,
                imageUrl: imageUrl,
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
        })
        .catch(function(error){
            console.error(error);
            return response.status(500).json({error: error});
        });
    })
    busboy.end(request.rawBody);
}

//Delete post
exports.deletePost = function(request, response){
    const document = db.doc(`/posts/${request.params.postId}`);
    document.get().then(function(doc){
        if (!doc.exists){
            return response.status(404).json({error: "Post could not be found"})
        }
        if (doc.data().email !== request.user.email){
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
    document.update(request.body)
    .then(function(){
        response.json({message:"Post updated successfully"});
    })
    .catch(function(error){
        console.error(error);
        return response.status(500).json({error: error.code, message:"500:Internal server error"});
    });
}