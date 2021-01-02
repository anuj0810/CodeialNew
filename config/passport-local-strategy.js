const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.use( new LocalStrategy(
        {usernameField:'email'},
    function(email,password,done){

        User.findOne({email:email}, function(err,user){
            if(err){
                console.log("error in finding the user using passport")
                return done(err);
            }
            if(!user || user.password != password){
                console.log("user login details are incorrect");
                return done(null, false);
            }
            return done (null, user);
        })

    }
))

passport.serializeUser(function(user, done){
 
    done(null, user.id)

});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("getting error in finding user");
            return done(err);
        }
        return  done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
return res.redirect('/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
// this will fetch the user from seesion cookie and pass it to local for views
  if(req.isAuthenticated()){
    res.locals.user = req.user;
}
    next();
}
module.exports = passport;