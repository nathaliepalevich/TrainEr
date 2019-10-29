import UserStore from './modules/UserStore.js'
import LessonStore from './modules/LessonStore.js'
import FilterStore from './modules/FilterStore.js'
import SwalStore from './modules/SwalStore.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    UserStore,
    LessonStore,
    FilterStore,
    SwalStore
  }
})
