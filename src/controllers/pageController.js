const router = require('express').Router()
const auth = require('../middleware/authMiddleware')
const postManager = require('../manager/postManager')

router.get('/create', auth.isAuthenticated, (req,res) => {
    res.render('create')
})

router.post('/create', async (req,res) => {
    const author = req.user 
    const {title, keyword, location, createData, imageUrl, description} = req.body

    try{
        await postManager.create({title, keyword, location, createData, imageUrl, description, author})

        res.redirect('/')
    }catch(err){
        res.render('create', {error: err.message})
    }
})

router.get('/404', (req,res) => {
    res.render('404')
})

module.exports = router