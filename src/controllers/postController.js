const router = require('express').Router()
const postManager = require('../manager/postManager')

router.get('/:id/details', async (req, res) => {
    const id = req.params.id
    const post = await postManager.findById(id).lean()
    const isAuthor = req.user?._id == post.author._id
    const guest = req.user?._id != post.author._id
    const isVoted = post.votes.includes(req.user?.email)
    const raiting = post.rating
    const usersVoted = post.votes.toString()
    const hasVotedUsers = usersVoted.length > 0

    res.render('details', { post, isAuthor, guest, isVoted, raiting, usersVoted, hasVotedUsers})
})

router.get('/:id/delete', async (req, res) => {
    const id = req.params.id

    try {
        await postManager.delete(id)
        res.redirect('/catalog')
    } catch (err) {
        res.redirect('/404')
    }
})
router.get('/:id/edit', async (req,res) => {
    const id = req.params.id
    try{
        const post = await postManager.findById(id)
        res.render('edit', post)
    }catch(err){
        res.redirect('/404')
    }


})
router.post('/:id/edit', async (req, res) => {
    const id = req.params.id
    const {title, keyword, location, createData, imageUrl, description, author} = req.body
    try {
        await postManager.update(id, {title, keyword, location, createData, imageUrl, description, author})
        res.redirect(`/post/${id}/details`)
    } catch (err) {
        res.render('edit', { error: err.message })
    }
})

router.get('/:id/upVote', async (req,res) => {
    const id = req.params.id 

    try{
        const post = await postManager.findById(id)
        post.rating++
        post.votes.push(req.user.email)
        post.save()

        res.redirect(`/post/${id}/details`)
    }catch(err){
        res.redirect('/404')
    }

})

router.get('/:id/downVote', async (req,res) => {
    const id = req.params.id 

    try{
        const post = await postManager.findById(id)
        post.rating--
        post.votes.push(req.user.email)
        post.save()

        res.redirect(`/post/${id}/details`)
    }catch(err){
        res.redirect('/404')
    }

})

module.exports = router