const JWT = require('jsonwebtoken')
require('dotenv').config()
const secret_word = process.env.SECRET_WORD

function generateToken(data) {
    let token = JWT.sign(data, secret_word )
    return token
}

function verifyToken(token) {
    try {
        let data = JWT.verify(token, secret_word)
        return data
    }
    catch(e){
        return false
    }
}

module.exports = {
    generateToken,
    verifyToken
}