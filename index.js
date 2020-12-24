const express = require('express');

const port =8000;

const app=express();

app.use('/', require('./routes'))

app.set('view engine' , 'ejs')
app.set('views', './view')


app.listen(port, function(err){
    if(err){
        console.log("there is an errro ")
    }
    console.log('you server is ready to move');
})