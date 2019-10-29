const bcrypt = require('bcrypt')
const userService = require('../user/UserService')

const saltRounds = 10

async function login(phoneNum, password) {

     const strPsw = password.toString()
     const user = await userService.getByPhone(phoneNum)
     if (!user) {
          console.log('Invalid email or password');
          return
     }

     const match = await bcrypt.compare(strPsw, user.password)

     if (!match) {
          console.log('Invalid password');
          return {}
     }
     delete user.password
     return user
}

async function signup(user) {
     // if (!user.fullName || !user.tel || !user.password) {
     //      return
     // }
     user.password = await bcrypt.hash(user.password, saltRounds)
     const addedUser = await userService.addUser(user)
     delete addedUser.password;
     return addedUser;
}


module.exports = {
     signup,
     login,
}