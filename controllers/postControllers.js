const userDb = require('../model/user');
const postDb = require('../model/post');
const commmentDb = require('../model/comment');

module.exports.createPost = function(req,res){
    postDb.create(
        {content:req.body.content,
        user:req.user.id},
        function(err,post){
            if(err){
                 console.log("error while posting any post")
                 return
            }
             return res.redirect('back');
})}

module.exports.destoryPost = function(req,res){
    postDb.findById(req.params.id , function(err,post){
        if(err){
           return console.log("post dont found to delete")
        }
        if(post.user==req.user.id){
            post.remove();

        commmentDb.deleteMany({post:req.params.id},function(err){
            if(err){
               return console.log("find err while deleting deleting post's comment");
            }
            return res.redirect('back');

        })
    }


    })
}