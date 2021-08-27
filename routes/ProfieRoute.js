const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('profile', {
        title: "Profile Page",
        path: '/profile',
        user_name: req.user?.name,
        email: req.user?.email
    })
})

module.exports = {
    path: '/profile',
    router: router
}