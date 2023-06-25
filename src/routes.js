const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const pageController = require('./controllers/pageController')
const postController = require('./controllers/postController')

router.use('/user', userController)
router.use('/post', postController)
router.get('/', homeController.getHomePage)
router.use(pageController)

module.exports = router