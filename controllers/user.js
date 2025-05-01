const User = require('../models/user')


async function handleUserSingup(req, res) {
    const { name , email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/'); 
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({email,password,});
    if(!user) return res.render('login',{
        error: "Invalid Email and Password"
    }) 
    return res.redirect("/"); 
}




module.exports = {
    handleUserSingup,
    handleUserLogin
}
















