const express = require("express")
const { connectToMongoDB } = require('./connection')
const urlRoute = require('./routes/url')
const app = express();
const PORT = 8001
const Url = require('./models/url')

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Mongodb connected"))

//for parsing the body we use one middleware
app.use(express.json()) 

app.use('/url', urlRoute)
app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry  = await Url.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})



app.listen(PORT, console.log(`Server started at PORT:${PORT}`))





























