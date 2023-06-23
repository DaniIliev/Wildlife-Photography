const router = require('express').Router()

router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register', async (req,res) => {
    const {name, lastname, email, password, repeatPassword} = req.body

    try{
        if(repeatPassword != password){
            throw Error('Passwords do not match!')
        }
        // const user = await 
    }catch(err){

    }
})

module.exports = router