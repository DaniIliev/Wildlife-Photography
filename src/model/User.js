const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname muss be required!']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname muss be required!']
    },
    email: {
        type: String,
        required: [true, 'Email muss be required!']
    },
    password: {
        type: String,
        required: [true, 'Password muss be required!']
    },
    myPosts: {
        type: Array,
        ref: 'Post'
    }
})

Schema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', Schema)

