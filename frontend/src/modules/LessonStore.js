import LessonService from '../services/LessonService'
import UserStore from './UserStore'

export default {
     state: {
          lessons: [],
          lesson: null,
     },
     getters: {
          lessons(state) { return state.lessons },
          lesson(state) { return state.lesson },
     },
     mutations: {
          setLesson(state, { lesson }) {
               state.lesson = lesson
          },
          setLessons(state, { lessons }) {
               state.lessons = lessons
          },
          deleteLesson(state, { lessonId }) {
               const idx = state.lessons.findIndex(lesson => lesson._id === lessonId)
               state.lessons.splice(idx, 1)
          },
          editLesson(state, { updatedLesson }) {
               const idx = state.lessons.findIndex(lesson => lesson._id === updatedLesson._id)
               state.lessons.splice(idx, 1, updatedLesson)
          },
          addLesson(state, { updatedLesson }) {
             state.lessons.unshift(updatedLesson)
          },
          sortByPrice(state, {}){

          const lessonCopy=  JSON.parse(JSON.stringify(state.lessons))
          lessonCopy.sort((a, b) => {
                 return a.price - b.price;
           });
               state.lessons = lessonCopy
          },
          sortByTime(state, {}){
          const lessonCopy=  JSON.parse(JSON.stringify(state.lessons))
          lessonCopy.sort((a, b) => {
            return new Date(a.dateTime) - new Date(b.dateTime);
           });
               state.lessons = lessonCopy
          }

     },
     actions: {
          async  getLessons(context, { filterBy=[] }) {
               const lessons = await LessonService.query(filterBy)
                         context.commit({ type: 'setLessons', lessons })
                         return lessons
          },
          async   getLessonById(context, { lessonId }) {
               return await LessonService.getLessonById(lessonId)
          },
          async saveLesson(context, { editLesson }) {
               const currCommit = (editLesson._id) ? 'editLesson' : 'addLesson'
               const updatedLesson = await  LessonService.saveLesson(editLesson)
                         context.commit({ type: currCommit, updatedLesson })
                         return updatedLesson
          },
          async deleteLesson(context, { deleteLesson }) {
               await LessonService.deleteLesson(deleteLesson)
                      const lessons = await  LessonService.query([])
                                   context.commit({ type: 'setLessons', lessons })
          },
          async  addUserToLesson(context, { lessonId }) {
               const user = UserStore.state.user
               const updatedLesson = await  LessonService.addUserToLesson(lessonId, user)
                         context.commit({ type: 'editLesson', updatedLesson })
                         return updatedLesson
          },
          async  removeUserFromLesson(context, { lessonId }) {
               const user = UserStore.state.user
               const updatedLesson = await LessonService.removeUserFromLesson(lessonId, user)
                         context.commit({ type: 'editLesson', updatedLesson })
                         return updatedLesson
          },
          async getLessonsByUser(context, { profilesUserId }) {
               return await LessonService.getLessonsByUser(profilesUserId)
              
          },
          async getLessonsByTrainer(context, { profilesUserId }) {
               return await LessonService.getLessonsByTrainer(profilesUserId)
                         
          },
     }
}
