const { urlencoded } = require('express');
const express = require('express');

const port =8000;

const app=express();

const db = require('./config/mongoose');

// const userDb  = require('../model/user');



app.use(require('express-ejs-layouts'));
app.use(express.static('./assets'));
app.use(urlencoded())

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.use('/', require('./routes'))


app.set('layouts extractStyles', true)
app.set('layouts extractScripts', true)
app.set('view engine' , 'ejs')
app.set('views', './view')


app.listen(port, function(err){
    if(err){
        console.log("there is an errro ")
    }
    console.log('you server is ready to move');
})