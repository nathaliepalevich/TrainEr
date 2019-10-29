const lessonService = require('./LessonService')

module.exports = {
     getLessons,
     getLessonById,
     deleteLesson,
     addUserToLesson,
     getLessonsByUser,
     addNewLesson,
     getLessonsByTrainer,
     updateLesson,
     removeUserFromLesson
}

async function getLessons(req, res) {
     let filteredLessons = req.params.filterBy
     const lessons = await lessonService.query(filteredLessons)
     res.send(lessons)
     // res.json({msg: 'This is CORS-enabled for all origins!'})
}

async function getLessonById(req, res) {
     const lesson = await lessonService.getLessonById(req.params.id)
     res.send(lesson)
}

async function deleteLesson(req, res) {
     await lessonService.deleteLesson(req.params.id)
     res.send({})
}
async function getLessonsByUser(req, res) {
     const userId = req.body.userId
    
     
     const lessonsByUser = await lessonService.getLessonsByUser(userId)
     res.send(lessonsByUser)
}
async function getLessonsByTrainer(req, res) {
     const trainerId = req.body.userId
     const lessonsByTrainer = await lessonService.getLessonsByTrainer(trainerId)
     res.send(lessonsByTrainer)
}

async function addNewLesson(req, res) {
     const lesson = req.body     
     const lessonsByUser = await lessonService.addNewLesson(lesson)
     res.send(lessonsByUser)
}
async function updateLesson(req, res) {
     const lesson = req.body     
     const updatedLesson = await lessonService.updateLesson(lesson)
     res.send(updatedLesson)
}
async function addUserToLesson(req, res) {
     let user = req.body.user
     let lessonId = req.body.lessonId
     const lesson = await lessonService.addUserToLesson(user, lessonId)
     res.send(lesson)
}
async function removeUserFromLesson(req, res) {
     let user = req.body.user
     let lessonId = req.body.lessonId
     const lesson = await lessonService.removeUserFromLesson(user, lessonId)
     res.send(lesson)
}



