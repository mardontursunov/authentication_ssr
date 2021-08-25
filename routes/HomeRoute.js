const router = require('express').Router()

router.get('/',  (req, res) => {
    res.render('index', {
        title: "Home Page",
        path: '/',
        user_name: req.user?.name,
        email: req.user?.email
    })
})

module.exports = {
    path: '/',
    router: router
}