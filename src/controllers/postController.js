const router = require('express').Router()
const postManager = require('../manager/postManager')

router.get('/:id/details', async (req,res) => {
    const id = req.params.id
    const post = await postManager.findById(id).lean()
    const isAuthor = req.user?._id == post.author._id
    const guest = req.user?._id != post.author._id
    console.log(isAuthor)
    res.render('details', {post, isAuthor, guest})
})

module.exports = router