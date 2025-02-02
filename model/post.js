const mongoose  = require('mongoose');
const User = require('./user');

const postSchema = new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // adding array of comment id 
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]

},
{
    timestamps:true
})

const Post = mongoose.model('Post',postSchema);

module.exports= Post;