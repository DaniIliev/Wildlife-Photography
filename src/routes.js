const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const pageController = require('./controllers/pageController')


router.use('/user', userController)
router.get('/', homeController.getHomePage)
router.use(pageController)

module.exports = router