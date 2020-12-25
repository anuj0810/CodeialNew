const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeialDb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error while connecting with DB"));

db.once('open', function(){
    console.log("hurreh database is working **")
})

module.exports = db;