const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')

router.use('/user', userController)
router.get('/', homeController.getHomePage)


module.exports = router