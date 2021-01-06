const userDb = require('../model/user');
const postDb = require('../model/post');
const commmentDb = require('../model/comment');

const { populate } = require('../model/user');

module.exports.home = function (req, res) {
    if(req.isAuthenticated()){
        // return res.redirect('/home');
        // postDb.find({}, function(err,post){
        //     if(err){
        //         return console.log("errror in finding post");
        //     }
        //    return  res.render('home', {
        //         title: "profile",
        //         name: "anuj",
        //         post:post
        //     })

        // })
        postDb.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
           }).
        exec(function(err,post){
            if(err){
                return console.log("errror in finding post");
            }
           return  res.render('home', {
                title: "profile",
                name: "anuj",
                post:post
            })

        })
    
    }
    
}
module.exports.profile = function (req, res) {
    res.render('profile', {

    })
}

module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('signUp', {

    })
}

module.exports.createUser = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        res.redirect('back');
        return;
    }
    userDb.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("getting error user is ")
            return;
}
        if (!user) {
            userDb.create(req.body, function (err, user) {
                if (err) {
                    console.log("there is some error while while creating user sing up");
                    return;
                }
                console.log(`*** new sign up user  ${user} **`);
                return res.redirect('/');
            })
        }
    })
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('signIn', {

    })
}

module.exports.createSession= function(req,res){
     return res.redirect('/')
}
module.exports.signout= function(req,res){
    req.logout();
  return res.redirect('/');
}

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