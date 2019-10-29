import UserService from '../services/UserService.js'

export default {
     state: {
          user: {},
          users: null,
          isTrainer: false,
          currProfileUser: null
     },
     getters: {
          getUser(state) {
               return state.user
          },
          getUsers(state) {
               return state.users
          },
          getCurrProfileUser(state) {
               return state.currProfileUser
          }
     },
     mutations: {
          setUser(state, {user}) {
               state.user = user
          },
          setUsers(state, {allUsersPage}) {
               state.users = allUsersPage

          },
          editUser(state, {updatedUser}) {
               state.user = updatedUser
          },
          logout(state) {
               state.user = null
          },
          setCurrProfileUser(state, {user}) {
               state.currProfileUser = user
          }
     },

     actions: {
          async getLoggedUser(context) {
               const user = await UserService.getLoggedInUser()
               context.commit({
                    type: 'setUser',
                    user
               })
               return user
          },
          async login(context, {userCred}) {
               const user = await UserService.login(userCred)
               context.commit({
                    type: 'setUser',
                    user
               })
               return user
          },
          async saveUser(context, {editUser}) {
               let currCommit = 'setUser';
               let loggedUser = context.getters.getUser
               if(!loggedUser)currCommit = 'setUser'
               else if(editUser._id !== loggedUser._id ) currCommit =  'setCurrProfileUser'
               const user = await UserService.saveUser(editUser)
               context.commit({
                    type: currCommit,
                    user
               })
               return user
          },
          async logout(context,  {editUser}) {
               const user = await UserService.logout(editUser)
               context.commit({
                    type: 'setUser',
                    user: null
               })
               return user
          },
          async currProfileUser(context, {profilesUserId}) {
               const currPageUser = await UserService.getUserById(profilesUserId)
               context.commit({
                    type: 'setCurrProfileUser',
                    currPageUser
               })
               return currPageUser
          },
          async loadUsers(context, users) {
               const allUsersPage = await UserService.query(users)
               context.commit({
                    type: 'setUsers',
                    allUsersPage
               })
               return allUsersPage
          }
     },
}