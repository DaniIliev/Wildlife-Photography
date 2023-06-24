const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title:{
        type: String, 
        required: [true, 'Title muss be required!']
    },
    keyword:{
        type: String, 
        required: [true, 'Keyword muss be required!']
    },
    location:{
        type: String, 
        required: [true, 'Location muss be required!']
    },
    createData:{
        type: String, 
        required: [true, 'Data of CREATE muss be required!']
    },
    imageUrl:{
        type: String, 
        required: [true, 'ImageUrl muss be required!']
    },
    description:{
        type: String, 
        required: [true, 'Description muss be required!']
    },
    autor:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    votes:{
        type: Array
    },
    rating:{
        type: Array
    }
})

const Post = mongoose.model('Post', Schema)

module.exports = Post