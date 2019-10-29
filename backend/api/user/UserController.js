const UserService = require('./UserService')

module.exports = {
     loadUsers,
     getUserById,
     signup,
     getLoggedInUser,
     updateReview,
     logout
}

async function loadUsers(req, res) {
     const users = await UserService.query()
     res.send(users)
}

async function logout(req, res){
     const user = await UserService.logout(req.body)
     res.send(user)
}

async function getUserById(req, res) {
     const user = await UserService.getUserById(req.params.id)
     res.send(user)
}
async function getLoggedInUser(req, res) {
     const user = await UserService.getLoggedInUser()
     res.send(user)
}
async function updateReview(req, res){
     try {
          const addedUser = req.body
          const user = await UserService.addUser(addedUser)
          res.json(user)
     } catch (err) {
          res.status(500).send({ error: 'could not signup, please try later' })
     }
}

async function signup(req, res) {
     try {
          const addedUser = req.body
          const user = await UserService.addUser(addedUser)
          req.session.user = user
          
          res.json(user)
     } catch (err) {
          res.status(500).send({ error: 'could not signup, please try later' })
     }
}
