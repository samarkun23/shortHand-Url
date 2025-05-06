const express = require('express');
const URL = require('../models/url');
const { restricTo } = require('../middleware/auth');
const router = express.Router();

router.get('/', restricTo(['NORMAL','ADMIN']) ,async(req,res)=> {
    const allUrls = await URL.find({ createdBy: req.user._id })
    return res.render('home', {
        urls: allUrls
    })
})

//adding a router for admin
router.get('/admin/urls', restricTo(['ADMIN']) , async (req, res) => {
   const allUrls = await URL.find({createdBy: req.user._id})
   return res.render('home', {
        urls:allUrls
   }) 
})


router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/login',(req, res) => {
    return res.render('login')
})






module.exports= router;



















