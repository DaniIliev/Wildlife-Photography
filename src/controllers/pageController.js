const router = require('express').Router()
const auth = require('../middleware/authMiddleware')
const postManager = require('../manager/postManager')

router.get('/create', auth.isAuthenticated, (req,res) => {
    res.render('create')
})

router.post('/create', async (req,res) => {
    const author = req.user 
    const {title, keyword, location, createData, imageUrl, description} = req.body
    let rating = 0 
    try{
        await postManager.create({title, keyword, location, createData, imageUrl, description, rating, author})

        res.redirect('/')
    }catch(err){
        res.render('create', {error: err.message})
    }
})

router.get('/404', (req,res) => {
    res.render('404')
})

router.get('/catalog', async (req,res) => {
    const posts = await postManager.findAll().lean()

    const noAvaiblePosts = posts.length == 0 
    
    res.render('catalog', {posts, noAvaiblePosts})
})
module.exports = router