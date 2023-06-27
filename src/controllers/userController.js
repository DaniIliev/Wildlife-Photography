const router = require('express').Router()
const userManager = require('../manager/userManager')
const postManager = require('../manager/postManager'))
const secret = require('../config/secret')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register', async (req,res) => {
    const {firstname, lastname, email, password, repeatPassword} = req.body

    try{
        if(repeatPassword != password){
            throw Error('Passwords do not match!')
        }
        const user = await userManager.register({firstname,lastname,email,password})
        const payload = {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email}
        const token = jwt.sign(payload,secret(),{expiresIn: '2h'})

        res.cookie('auth', token)
        res.redirect('/')
    }catch(err){
        res.render('register', {error: err.message})
    }
})

router.get('/login', (req,res) => {
    res.render('login')
})

router.post('/login', async (req,res) => {
    const {email, password} = req.body

    try{
        const user = await userManager.findOne({email})
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!user || !isValidPassword){
            throw Error('Invalid email or password')
        }

        const payload = {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email}
        const token = jwt.sign(payload, secret(), {expiresIn: '2h'})

        res.cookie('auth', token)
        res.redirect('/')
    }catch(err){
        res.render('login', {error: err.message})
    }
})

router.get('/post', async (req,res) => {
    const posts = await postManager.findAll().lean()
    
    res.render('myPost')
})

router.get('/logout', (req,res) => {
    res.clearCookie('auth')
    res.redirect('/')
})
module.exports = router