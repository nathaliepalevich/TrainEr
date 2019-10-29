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
          getLessons(context, { filterBy=[] }) {
               return LessonService.query(filterBy)
               .then(lessons => {
                         context.commit({ type: 'setLessons', lessons: lessons })
                         return lessons
                    })
          },
          getLessonById(context, { lessonId }) {
               return LessonService.getLessonById(lessonId)
                    .then(lesson => {
                         // context.commit({ type: 'setLesson', lesson })
                         return lesson;
                    })
          },
          saveLesson(context, { editLesson }) {
               const currCommit = (editLesson._id) ? 'editLesson' : 'addLesson'
               return LessonService.saveLesson(editLesson)
                    .then(updatedLesson => {
                         context.commit({ type: currCommit, updatedLesson })
                         return updatedLesson
                    })
          },
          deleteLesson(context, { deleteLesson }) {
               return LessonService.deleteLesson(deleteLesson)
                    .then(_ => {
                      return   LessonService.query([])
                              .then(lessons => {
                                   context.commit({ type: 'setLessons', lessons })
                              })
                    })
          },
          addUserToLesson(context, { lessonId }) {
               const user = UserStore.state.user
               return LessonService.addUserToLesson(lessonId, user)
                    .then(updatedLesson => {
                         context.commit({ type: 'editLesson', updatedLesson })
                         return updatedLesson
                    })
          },
          removeUserFromLesson(context, { lessonId }) {
               const user = UserStore.state.user
               return LessonService.removeUserFromLesson(lessonId, user)
                    .then(updatedLesson => {
                         context.commit({ type: 'editLesson', updatedLesson })
                         return updatedLesson
                    })
          },
          getLessonsByUser(context, { profilesUserId }) {
               return LessonService.getLessonsByUser(profilesUserId)
                    .then(lessonsByUser => {
                         return lessonsByUser
                    })
          },
          getLessonsByTrainer(context, { profilesUserId }) {
               return LessonService.getLessonsByTrainer(profilesUserId)
                    .then(lessonsByTrainer => {
                         return lessonsByTrainer
                    })
          },
     }
}
