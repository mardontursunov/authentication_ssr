const router = require('express').Router()
const users = require('../data')
const { confirmHash } = require('../modules/crypt')
const { generateToken } = require('../modules/jwt')

router.get('/', (req, res) => {
    res.render('login', {
        title: "Login Page",
        path: '/login',
        error: '',user_name: req.user?.name,
        email: req.user?.email
    })
})

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        if(!(email && password)) throw "Email or Password is incorrect!"
        let user = findUser(email)
        if(!user) throw "The user isn't found!"
        let isTrust = await confirmHash(password, user.password)
        if(!isTrust) throw "Password is incorrect!"
        let token = generateToken({ id: user.id })
        
        res.cookie('token', token).redirect('/')
    }
    catch (e) {
        res.render('login', {
            title: "Login",
            path: "/login",
            error: e + '',
            user_name: req.user?.name,
            email: req.user?.email
        })
    }
}) 

module.exports = {
    path: '/login',
    router: router
}

function findUser (email) {
    return users.find(user => user.email == email)
}