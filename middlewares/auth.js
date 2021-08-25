const users = require('../data')
const { verifyToken } = require('../modules/jwt')

module.exports = async function (req, res, next) {
    let token = req.cookies?.token
    if(token){
        let user = verifyToken(token)
        user = findUser(user.id)
        if(user){
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
    next()
}

function findUser (id) {
    return users.find(user => user.id == id)
}