const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('about', {
        title: "About Page",
        path: '/about',
        user_name: req.user?.name,
        email: req.user?.email
    })
})

module.exports = {
    path: '/about',
    router: router
}