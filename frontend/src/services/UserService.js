
import axios from 'axios'

export default {
     query,
     getUserById,
     saveUser,
     login,
     logout,
     getLoggedInUser
}

const BASE_URL = process.env.NODE_ENV === 'production'
? ''
: '//localhost:3000' 

async function query() {
     const {data} = await axios.get(`${BASE_URL}/api/user`)
     return data
}

async function getUserById(userId) {
     const user = await axios.get(`${BASE_URL}/api/user/${userId}`)
     return user.data
}

async function login(userCred) {
     const user = await axios.post(`${BASE_URL}/api/auth/login/`, userCred)
     return _handleSuccessfulRegister(user.data)
}
async function logout(user) {
     sessionStorage.clear()
     const userNone = await axios.put(`${BASE_URL}/api/user/logout/`, user)
     return userNone
}

async function saveUser(userCred) {
     const loggedUser = getLoggedInUser() 
     if (userCred._id) {
          if(loggedUser._id !== userCred._id){
               var result = await axios.put(`${BASE_URL}/api/user/update-review`, userCred)
               return result.data
          }
          var result = await axios.put(`${BASE_URL}/api/user/signup`, userCred)
     } else {
          var result = await axios.post(`${BASE_URL}/api/user/signup`, userCred)
     }
     sessionStorage.clear()
     _handleSuccessfulRegister(result.data)
     return result.data
}
const USER_KEY = 'loggedInUser'

function getLoggedInUser() {
     let loggedInUser = sessionStorage.getItem(USER_KEY)
     return JSON.parse(loggedInUser);
}

function _handleSuccessfulRegister(user) {
     sessionStorage.setItem(USER_KEY, JSON.stringify(user));
     return user;
}