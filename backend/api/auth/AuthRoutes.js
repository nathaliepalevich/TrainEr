const express = require('express')
// const requireAuth = require('../../middlewares/requireAuth.middleware')
const { login, logout } = require('./AuthController')

const router = express.Router()

router.post('/login', login)
// router.post('/signup', signup)
// router.put('/signup', signup)

module.exports = router