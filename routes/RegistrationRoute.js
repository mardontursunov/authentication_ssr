const router = require('express').Router()
let users = require('../data')
const { generateHash } = require('../modules/crypt')
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.render('registration', {
        title: "Registration Page",
        path: '/registration',
        error: '',
        user_name: req.user?.name,
        email: req.user?.email
    })
})

router.post('/', async (req, res) => {
    try {
        const {email, name, password} = req.body
        if(!(email && name && password)) throw ("Fields aren't completed!")
        if(findUser(email)) throw "This email is already in use!"
        users.push({
            id: uuidv4(),
            email,
            name,
            password: await generateHash(password)
        })
        res.redirect('/login')
    }
    catch(e) {
        res.render('registration', {
            title: "Registration",
            path: '/registraion',
            error: e + '',
            user_name: req.user?.name,
            email: req.user?.email
        })
    }
})

module.exports = {
    path: '/registration',
    router: router
}

function findUser (email) {
    return users.find(user => user.email == email)
}