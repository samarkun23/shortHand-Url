const jwt = require('jsonwebtoken')
const secret = "samarkun@$1234"
function setUser(user) { 
   return jwt.sign(user, secret) 
}

function getUser(id) {
   return sessionIdToUserMap.get(id) 
}


module.exports = {
    setUser,
    getUser,
}







