const User = require('../models/user')


async function handleUserSingup(req, res) {
    const { name , email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home"); 
}




module.exports = {
    handleUserSingup,
}
















