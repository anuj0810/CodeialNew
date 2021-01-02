const express = require('express');
const port =8000;
const app=express();

const db = require('./config/mongoose');
const cookieParser = require('cookie-parser'); 
const boodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const { urlencoded } = require('body-parser');
const MongoStore = require('connect-mongo')(session); 

app.use(cookieParser())
app.use(expressLayout);
app.use(express.static('./assets'));
app.use(urlencoded())
app.use(boodyParser.json());


app.set('layout extractStyles', true)
app.set('layout extractScripts', true)




app.set('layouts extractStyles', true)
app.set('layouts extractScripts', true)
app.set('view engine' , 'ejs')
app.set('views', './view')

app.use(session({
    name:'codeial',
    secret:'blahsomething',//will change it latter,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'there is all ok');
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use('/', require('./routes'))


app.listen(port, function(err){
    if(err){
        console.log("there is an errro ")
    }
    console.log('you server is ready to move');
})