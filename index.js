const express = require("express")
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require('./connection')
const app = express();
const PORT = 8001
const {checkForAuthentication, restricTo} = require('./middleware/auth')
const Url = require('./models/url')

//all routes
const urlRoute = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const userRoute = require('./routes/user')




connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("Mongodb connected"));

//setting ejs for server site rendering
app.set('view engine', 'ejs')
app.set('views', path.resolve("./view"))

//for parsing the body we use one middleware
app.use(express.json())
//for parsing form data its is new middleware
app.use(express.urlencoded({ extended: false }))
//for parsing the cookie 
app.use(cookieParser());    
app.use(checkForAuthentication)


app.use('/url', restricTo(['NORMAL', 'ADMIN'])  ,urlRoute) //using the middleware
app.use('/user', userRoute)
//
app.use('/', staticRouter)


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL)
})



app.listen(PORT, console.log(`Server started at PORT:${PORT}`))





























