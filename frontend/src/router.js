import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LessonDetails from './views/LessonDetails.vue'
import UserDetails from './views/UserDetails.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/LogIn.vue'
import Users from './views/UsersPage.vue'
import LessonForm from './components/LessonForm.vue'
import AppGuide from './views/AppGuide.vue'
// import AboutUser from './views/AboutUser.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/app-guide',
      name: 'appGuide',
      component: AppGuide
    },
    {
      path: '/lesson/:id',
      name: 'lessonDetails',
      component: LessonDetails,
    },
   {
      path: '/lesson/:id/edit-lesson',
      name: 'EditLesson',
      component: LessonForm,
      props: true
    },
    {
      path: '/user-details/:id',
      name: 'userDetails',
      component: UserDetails ,
    //   children: [
    //     {
    //       path: "about-user",
    //       name: "about-user",
    //       component: AboutUser
    //   }
    // ]
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})

// // route level code-splitting
// // this generates a separate chunk (about.[hash].js) for this route
// // which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')