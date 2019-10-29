const express = require('express')
// const requireAuth = require('../../middlewares/requireAuth.middleware')
const { getLessons, getLessonById, deleteLesson, addUserToLesson, getLessonsByUser,removeUserFromLesson, addNewLesson , getLessonsByTrainer,
     updateLesson } = require('./LessonController')
const router = express.Router()



router.get('/getLessons/:filterBy', getLessons)
router.get('/:id', getLessonById)
router.delete(`/deleteLesson/:id`, deleteLesson)
router.post('/addUserToLesson', addUserToLesson)
router.post('/removeUserFromLesson', removeUserFromLesson)
router.post('/getLessonsByUser', getLessonsByUser)
router.post('/getLessonsByTrainer', getLessonsByTrainer)
router.post('/addNewLesson', addNewLesson)
router.put('/updateLesson', updateLesson)
module.exports = router