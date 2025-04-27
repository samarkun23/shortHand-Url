const express = require("express")
const { connectToMongoDB } = require('./connection')
const urlRoute = require('./routes/url')
const app = express();
const PORT = 8001

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("Mongodb connected"))

app.use('/', urlRoute)

app.listen(PORT, console.log(`Server started at PORT:${PORT}`))





























