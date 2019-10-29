

const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const saltRounds = 10

async function query(filterBy = {}) {

    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.name = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = {$gte : filterBy.minBalance}
    // }
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}


async function logout(user){
    const collection = await dbService.getCollection('user')
    
      try {
        let userId = new ObjectId(user._id)
        user._id = userId
         await collection.updateOne({ "_id": ObjectId(userId) }, { $set: user })
        await collection.findOne({ "_id": ObjectId(userId) })
        return null
  
      } catch (err) {
          console.log(`Error: while finding user ${userId}`);
          throw err;
      }
}

async function getUserById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        return user

    } catch (err) {
        console.log(`Error: while finding user ${userId}`);
        throw err;
    }
}

async function addUser(user) {
    const collection = await dbService.getCollection('user')
    try {
        if (!user._id) {
            user.password = await bcrypt.hash(user.password, saltRounds)
            const { insertedId } = await collection.insertOne(user)
            return await collection.findOne({ "_id": ObjectId(insertedId) })
        }
        else {
            let userId = new ObjectId(user._id)
            user._id = userId
             await collection.updateOne({ "_id": ObjectId(userId) }, { $set: user })
            return await collection.findOne({ "_id": ObjectId(userId) })
        }
    }
    catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function getByPhone(tel) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ tel })
        if(user){
            let userId = new ObjectId(user._id)
            user._id = userId
            await collection.updateOne({ "_id": ObjectId(userId) }, { $set: user })
        }
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${tel}`)
        throw err;
    }
}


module.exports = {
    getUserById,
    addUser,
    getByPhone,
    query,
    logout
}

