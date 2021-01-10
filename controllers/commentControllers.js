// const userDb = require('../model/user');
const postDb = require('../model/post');
const commmentDb = require('../model/comment');

module.exports.createComment = function(req,res){
    postDb.findById(req.body.post, function(err,post){
        if(err){
            return console.log("error finding post for comment")
        }
        if(post){
            commmentDb.create({
                content:req.body.content,
                user:req.user.id,
                post:req.body.post
            }, function(err,comment){
                if(err){
                    return console.log("error on comment")
                }

                post.comments.push(comment)
                post.save()

                return res.redirect('back');
            })

        }
    })
   
}

module.exports.destoryComment = function(req,res){
    commmentDb.findById(req.params.id, function(err,comment){
        if(err){
return console.log("comment did find");
        }
        if(comment.user== req.body.id){
        const postid = comment.post.id

        comment.remove();

        postDb.findByIdAndUpdate(postid, {$pull:{comments:req.params.id}}, function(err,post){
            if(err){
                return console.log("didn't find the comment in comments arary")
            }
            return res.redirect('back');
        })
    }
    })
}