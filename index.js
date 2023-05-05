const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const dot = require('dotenv').config()
const path = require('path')
const router = require('./router')
const cors = require('cors')
const port = process.env.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: ['http://localhost:3000', 'https://query-boat.onrender.com', 'https://blissful-shadow-99347.pktriot.net'] }
))
app.use(fileUpload())
app.use('/image', express.static(path.join(__dirname, 'public/image')))
app.use('/video', express.static(path.join(__dirname, 'public/video')))
app.use(bodyParser.json())
app.use(router)

// server listen 
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})