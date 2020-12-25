const userDb = require('../model/user');

module.exports.home = function (req, res) {
    res.render('home', {
        title: "profile",
        name: "anuj"
    })
}
module.exports.profile = function (req, res) {
    res.render('profile', {

    })
}

module.exports.signUp = function (req, res) {
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


module.exports.signIn= function(req,res){
     //to do latter
}