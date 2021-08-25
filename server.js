const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')


// Configs
require('dotenv').config()
const PORT = process.env.PORT || 5500


// Settings
app.set('view engine', 'ejs')


// Middlewares
const cookieParser = require('cookie-parser')
const AuthMiddleware = require('./middlewares/auth')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(AuthMiddleware)


// Route settings
const routePath = path.join(__dirname, 'routes')
fs.readdir(routePath, (err, data) => {
    data.forEach(routeFile => {
        let route = require('./routes/' + routeFile)
        if(route){
            app.use(route.path, route.router)
        }
    })
})


app.listen(PORT, _ => console.log(`Server is running on *${PORT}`))