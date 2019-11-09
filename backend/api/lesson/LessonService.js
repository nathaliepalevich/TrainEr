
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = []) {
     let values = filterBy
     if(filterBy.length) {
      values = filterBy.split(',')
     } 
     else values = []

     const collection = await dbService.getCollection('lesson')
     let lessons;
     try {
          if(values[0] === 'filterArr'){
                lessons = await collection.find({"dateTime" : { $gte : new Date()}}).toArray();
          }
          else {
               lessons = await collection.find({$and:[{ "trainTypes": { $in: values}},{ "dateTime" : { $gte : new Date()}}]}).toArray();
          }
          
          return lessons
     } catch (err) {
          console.log('ERROR: cannot find lessons', err)
          throw err;
     }
}

async function getLessonById(lessonId) {
     const collection = await dbService.getCollection('lesson')
     try {
          return await collection.findOne({ "_id": ObjectId(lessonId) })
     } catch (err) {
          console.log(`Error: while finding lesson ${lessonId}`);
          throw err;
     }
}

async function deleteLesson(lessonId) {
     const collection = await dbService.getCollection('lesson')
     try {
         await collection.deleteOne({ "_id": ObjectId(lessonId) })
        return {}
     } catch (err) {
          console.log(`Error: cannot remove Lesson, ${lessonId}`);
          throw err
     }
}

async function updateLesson(lesson) {
     lesson.dateTime =new Date(lesson.dateTime)
     const collection = await dbService.getCollection('lesson')
     try {
          let lessonId = new ObjectId(lesson._id)
          delete lesson._id;  
           await collection.updateOne({ "_id": lessonId }, { $set: lesson })
           return await collection.findOne({ "_id": ObjectId(lessonId)});
           
           
     } catch (err) {
          console.log(`ERROR: cannot update lesson: ${lesson._id}`);
          throw (err)
     }
}

async function addNewLesson(lesson) {
     lesson.dateTime = new Date(lesson.dateTime)
     const collection = await dbService.getCollection('lesson')
     try {
          await collection.insertOne(lesson);   
          return lesson
     } catch (err) {
          console.log(`ERROR: cannot insert lesson`);
          throw err
     }
}

async function addUserToLesson(user, lessonId) {
     const collection = await dbService.getCollection('lesson')
     try {
          await collection.updateOne(
               { "_id": ObjectId(lessonId) },
               { $push: { regTrainees: user } }
          )
          const lesson = await collection.findOne({ "_id": ObjectId(lessonId) })
          return lesson
     } catch (err) {
          console.log(`ERROR: cannot insert lesson`);
          throw err
     }
}
async function removeUserFromLesson(user, lessonId) {
     const userId = user._id
     const collection = await dbService.getCollection('lesson')
     try {
          await collection.updateOne(
               { "_id": ObjectId(lessonId) },
               { $pull: { regTrainees: {_id: userId} } }
          )
          const lesson = await collection.findOne({ "_id": ObjectId(lessonId) })
          return lesson
     } catch (err) {
          console.log(`ERROR: cannot insert lesson`);
          throw err
     }
}

async function getLessonsByUser(userId) {
     const collection = await dbService.getCollection('lesson')
     try {
          const lessons = await collection.find({ "regTrainees._id": userId }).toArray()          
          return lessons
     } catch (err) {
          console.log(`ERROR: cannot get lesson`);
          throw err
     }
}
async function getLessonsByTrainer(trainerId) {
     const collection = await dbService.getCollection('lesson')
     try {
         return await collection.find({ "createdBy.trainerId": trainerId }).toArray()
     } catch (err) {
          console.log(`ERROR: cannot get lesson`);
          throw err
     }
}

module.exports = {
     query,
     getLessonById,
     deleteLesson,
     updateLesson,
     addNewLesson,
     addUserToLesson,
     getLessonsByUser,
     getLessonsByTrainer,
     removeUserFromLesson
} 
