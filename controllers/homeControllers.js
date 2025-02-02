const userDb = require('../model/user');
const postDb = require('../model/post');
const commmentDb = require('../model/comment');

const { populate } = require('../model/user');

module.exports.home = function (req, res) {

    // return res.redirect('/home');
    // postDb.find({}, function(err,post){
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
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).
        exec(function (err, post) {
            userDb.find({}, function (err, user) {
                if (err) {
                    return console.log("errror in finding post");
                }
                return res.render('home', {
                    title: "profile",
                    name: "anuj",
                    post: post,
                    allUser: user
                })

            })
        })

}


module.exports.profile = function (req, res) {
    userDb.findById(req.params.id, function(err, user){
        if(err){}
       return res.render('profile', {
             profile :user
        })
    })
}


module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
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

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('signIn', {

    })
}

module.exports.createSession = function (req, res) {
    return res.redirect('/')
}
module.exports.signout = function (req, res) {
    req.logout();
    return res.redirect('/');
}

module.exports.updateUser = function(req,res){
    if(req.params.id== req.user.id){
         userDb.findByIdAndUpdate(req.params.id,  req.body , function(err, user){
            return res.redirect('back')
         })

    }
    else{
        return res.status
    }
}



