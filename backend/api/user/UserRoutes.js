const express = require('express')
// const requireAuth = require('../../middlewares/requireAuth.middleware')

const { loadUsers, getUserById, signup, getLoggedInUser, logout, updateReview } = require('./UserController')

const router = express.Router()




router.get('/', loadUsers)
router.get('/loggedin', getLoggedInUser)
router.put('/logout', logout)
router.get('/:id', getUserById)
router.post('/signup', signup)
router.put('/signup', signup)
router.put('/update-review', updateReview)
module.exports = router