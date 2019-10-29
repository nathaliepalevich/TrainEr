
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId



async function getfilter() {
     const collection = await dbService.getCollection('filter')
     
     try {
          return await collection.find({}).toArray();
     } catch (err) {
          console.log(`Error: while finding filter/lesson`);
          throw err;
     }
}


module.exports = {
     getfilter

} 
