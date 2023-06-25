const express = require('express')
const routes = require('./routes')
const viewEngine = require('./config/handlebarsConfig')
const connectDb = require('./config/dbConfig')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/authMiddleware')

const app = express()
app.use(express.static('src/public'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(auth.isAuth)
app.use(routes)
viewEngine(app)
connectDb()



app.listen(3000, () => console.log('Server is listen on port 3000...'))