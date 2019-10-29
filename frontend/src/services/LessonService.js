
import axios from 'axios'

export default {
     query,
     getLessonById,
     addUserToLesson,
     getLessonsByUser,
     getLessonsByTrainer,
     deleteLesson,
     saveLesson,
     removeUserFromLesson
}
const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : '//localhost:3000' 

async function query(filterBy) {
     let filterArr = [...filterBy]
     if(!filterArr.length) filterArr = 'filterArr'
     const { data } = await axios.get(`http:${BASE_URL}/api/lesson/getLessons/${filterArr}`)
     return data
}

async function getLessonById(lessonId) {  
     const { data } = await axios.get(`http:${BASE_URL}/api/lesson/${lessonId}`)  
     return data
}

async function addUserToLesson(lessonId, user){
     const { data } = await axios.post(`http:${BASE_URL}/api/lesson/addUserToLesson/`, {lessonId, user})
     return data  
}
async function removeUserFromLesson(lessonId, user){
     const { data } = await axios.post(`http:${BASE_URL}/api/lesson/removeUserFromLesson/`, {lessonId, user})
     return data  
}
async function getLessonsByUser(userId){
     const { data } = await axios.post(`http:${BASE_URL}/api/lesson/getLessonsByUser`, {userId})
     return data
     
}
async function getLessonsByTrainer(userId){
     const { data } = await axios.post(`http:${BASE_URL}/api/lesson/getLessonsByTrainer`, {userId})
     return data
}

async function deleteLesson(lessonId) {
      await axios.delete(`${BASE_URL}/api/lesson/deleteLesson/${lessonId}` )
     
     
}

async function saveLesson(lesson) {
     let lessonFromDB;
     if (lesson._id) {
          lessonFromDB = await axios.put(`${BASE_URL}/api/lesson/updateLesson`, lesson)
     } else {
          lessonFromDB = await axios.post(`${BASE_URL}/api/lesson/addNewLesson/`, lesson)
     }
     return lessonFromDB.data
}

