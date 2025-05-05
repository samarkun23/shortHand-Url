const { getUser } = require('../uuidService/auth')

//Authontications
function checkForAuthentication(req, res, next) {
    const authorizationHeaderValue = req.headers['authorization'];
    req.user = null 
    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) 
        return next();  

    const token = authorizationHeaderValue.split('Bearer ')[1]
    const user = getUser(token);

    req.user = user;
    return next()

}

//ADMIN, NORMAL (For any role define) -> Authorization
function restricTo(role) {
    return function(req, res , next){
        if(!req.user) return res.redirect('/login') 
        
        if(role.includes(req.user.role)) return res.end('UnAuthorized')
        
        return next
    }

}






module.exports = {checkForAuthentication, restricTo}